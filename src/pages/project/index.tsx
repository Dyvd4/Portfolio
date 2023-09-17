import Badge from "@components/Badge";
import Button from "@components/Button";
import Input from "@components/Input";
import ProjectListItem from "@components/ListItems/ProjectListItem";
import useModalDisclosure from "@components/Modal/hooks/useModalDisclosure";
import AddProjectModal from "@components/Modals/Project/AddProjectModal";
import DeleteProjectModal from "@components/Modals/Project/DeleteProjectModal";
import EditProjectModal from "@components/Modals/Project/EditProjectModal";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useCurrentUrl from "@hooks/useCurrentUrl";
import useDebounce from "@hooks/useDebounce";
import { getLatestProjects } from "@pages/api/projects";
import request, { fetchEntity } from "@utils/request-utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

export async function getServerSideProps() {
	const latestProjects = await getLatestProjects();
	return {
		props: {
			projects: JSON.parse(JSON.stringify(latestProjects)) as typeof latestProjects,
		},
	};
}

type ProjectsProps = {} & Awaited<ReturnType<typeof getServerSideProps>>["props"];

function Projects({ projects: initialProjects, ...props }: ProjectsProps) {
	useBreadcrumb([
		{
			isHome: true,
		},
		{
			children: "projects",
			isCurrentPage: true,
		},
	]);
	const currentUrl = useCurrentUrl();
	const {
		isActive: projectEditModalIsActive,
		open: openProjectEditModal,
		close: closeProjectEditModal,
	} = useModalDisclosure();
	const {
		isActive: projectDeleteModalIsActive,
		open: openProjectDeleteModal,
		close: closeProjectDeleteModal,
	} = useModalDisclosure();
	const {
		isActive: projectAddModalIsActive,
		open: openProjectAddModal,
		close: closeProjectAddModal,
	} = useModalDisclosure();

	const [projectIdToEdit, setProjectIdToEdit] = useState<number | undefined>();
	const { status } = useSession();
	const [projectOrTagname, setProjectOrTagName] = useState("");
	const { value: debouncedProjectOrTagname } = useDebounce(projectOrTagname);
	const [setParentRef] = useAutoAnimate();
	const queryClient = useQueryClient();

	const { isLoading: projectsAreLoading, data: projects } = useQuery(
		["projects", debouncedProjectOrTagname],
		() => {
			return fetchEntity({
				route: `/api/projects`,
				queryParams: {
					projectOrTagname: debouncedProjectOrTagname,
				},
			});
		},
		{
			initialData: initialProjects,
		}
	);

	const projectReImportMutation = useMutation(
		(projectId: number) => {
			return toast.promise(
				request.post(`/api/project/${projectId}/import`),
				{
					loading: "Importing project from GitHub...",
					success: "Successfully imported project",
					error: "An unknown error occurred",
				},
				{
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				}
			);
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["projects"]);
			},
		}
	);

	const handleProjectEdit = (projectId: number) => {
		setProjectIdToEdit(projectId);
		openProjectEditModal();
	};
	const handleProjectDelete = (projectId: number) => {
		setProjectIdToEdit(projectId);
		openProjectDeleteModal();
	};
	const handleProjectReImport = (projectId: number) => {
		projectReImportMutation.mutate(projectId);
	};

	const metaTitle = "My projects";
	const metaDescription =
		"Overview of my coding projects. Most of them should be available on GitHub.";
	const metaTags = "Web app, coding, projects, GitHub, David Kimmich";

	return (
		<>
			<Head>
				<title>{metaTitle}</title>
				<meta name="description" content={metaDescription} />
				<meta name="keywords" content={metaTags} />
				{/* Facebook Meta Tags */}
				<meta property="og:url" content={currentUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={metaTitle} />
				<meta property="og:description" content={metaDescription} />
				{/* Twitter Meta Tags */}
				<meta property="twitter:url" content={currentUrl} />
				<meta name="twitter:title" content={metaTitle} />
				<meta name="twitter:description" content={metaDescription} />
			</Head>
			<main className="mx-auto">
				<h1 className="text-center text-6xl font-black sm:text-7xl">Projects</h1>
				{status === "authenticated" && (
					<>
						<Button onClick={openProjectAddModal}>Add project</Button>
					</>
				)}
				<Input
					value={projectOrTagname}
					onChange={(e) => setProjectOrTagName(e.target.value)}
					type="text"
					name="projectOrTagname"
					placeholder="search by project name or tag..."
					className="mt-12 rounded-md border-2"
				/>
				<ul ref={setParentRef} className="my-12 flex flex-col items-center gap-10">
					{!projectsAreLoading && projects.length === 0 && <p>No projects found 😴</p>}
					{!projectsAreLoading && projects.length > 0 && (
						<>
							{projects.map((project) => (
								<li
									className="flex w-full flex-col items-start gap-4"
									key={project.id}
								>
									<ProjectListItem
										id={project.id}
										alias={project.alias}
										imageUrl={project.imageUrl}
										description={project.description}
										tags={
											project.tags.length > 0 ? (
												<>
													{project.tags.map((tag) => (
														<Badge key={tag.name}>{tag.name}</Badge>
													))}
												</>
											) : undefined
										}
									/>
									{status === "authenticated" && (
										<>
											<div className="flex h-fit justify-center gap-4">
												<Button
													onClick={() => handleProjectDelete(project.id)}
												>
													Delete
												</Button>
												<Button
													onClick={() =>
														handleProjectReImport(project.id)
													}
												>
													Re-import
												</Button>
												<Button
													onClick={() => handleProjectEdit(project.id)}
												>
													Edit
												</Button>
											</div>
										</>
									)}
								</li>
							))}
						</>
					)}
				</ul>
			</main>
			{status === "authenticated" && (
				<>
					<AddProjectModal
						isActive={projectAddModalIsActive}
						close={closeProjectAddModal}
					/>
					<EditProjectModal
						isActive={projectEditModalIsActive}
						close={closeProjectEditModal}
						projectId={projectIdToEdit}
					/>
					<DeleteProjectModal
						isActive={projectDeleteModalIsActive}
						close={closeProjectDeleteModal}
						projectId={projectIdToEdit}
					/>
				</>
			)}
		</>
	);
}

export default Projects;
