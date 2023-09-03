import Badge from "@components/Badge";
import Button from "@components/Button";
import Card from "@components/Card";
import IconLink from "@components/IconLink";
import Input from "@components/Input";
import useModalDisclosure from "@components/Modal/hooks/useModalDisclosure";
import AddProjectModal from "@components/Modals/Project/AddProjectModal";
import DeleteProjectModal from "@components/Modals/Project/DeleteProjectModal";
import EditProjectModal from "@components/Modals/Project/EditProjectModal";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import { prisma } from "@prisma";
import { fetchEntity } from "@utils/request-utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";

export async function getServerSideProps() {
	const projects = await prisma.project.findMany({
		include: {
			tags: true,
		},
	});
	return {
		props: {
			projects: JSON.parse(JSON.stringify(projects)) as typeof projects,
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

	const handleProjectEdit = (projectId: number) => {
		setProjectIdToEdit(projectId);
		openProjectEditModal();
	};
	const handleProjectDelete = (projectId: number) => {
		setProjectIdToEdit(projectId);
		openProjectDeleteModal();
	};

	return (
		<>
			<Head>
				<title>My projects</title>
				<meta
					name="description"
					content="Overview of my coding projects. Most of them should be available on GitHub."
				/>
				<meta name="keywords" content="Web app, coding, projects, GitHub, David Kimmich" />
			</Head>
			<main className="mx-auto max-w-sm">
				<h1 className="text-center text-6xl font-black sm:text-7xl">
					Projects
					{status === "authenticated" && (
						<>
							<Button onClick={openProjectAddModal}>Add project</Button>
						</>
					)}
				</h1>
				<Input
					value={projectOrTagname}
					onChange={(e) => setProjectOrTagName(e.target.value)}
					type="text"
					name="projectOrTagname"
					placeholder="search by project name or tag..."
					className="mt-12 rounded-md border-2"
				/>
				<ul ref={setParentRef} className="my-12 flex flex-col items-center gap-6">
					{!projectsAreLoading && projects.length === 0 && <p>No projects found 😴</p>}
					{!projectsAreLoading && projects.length > 0 && (
						<>
							{projects.map((project) => (
								<li className="flex w-full justify-center gap-4" key={project.id}>
									<Card
										className="flex-grow"
										title={
											<>
												<IconLink href={`/project/${project.id}`}>
													{project.alias}
												</IconLink>
											</>
										}
										description={
											project.description || "No description available"
										}
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
