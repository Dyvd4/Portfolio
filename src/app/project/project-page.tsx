"use client";
import Badge from "@components/Badge";
import Button from "@components/Button";
import { H1 } from "@components/H1";
import Input from "@components/Input";
import ProjectListItem from "@components/ListItems/ProjectListItem";
import useModalDisclosure from "@components/Modal/hooks/useModalDisclosure";
import AddProjectModal from "@components/Modals/Project/AddProjectModal";
import DeleteProjectModal from "@components/Modals/Project/DeleteProjectModal";
import EditProjectModal from "@components/Modals/Project/EditProjectModal";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import request, { fetchEntity } from "@utils/request-utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient, useQuery, useMutation } from "react-query";

export default function ProjectPage({ initialProjects }) {
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
	// TODO set to search params
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

	return (
		<>
			<main className="mx-auto">
				<H1 className="text-center text-6xl sm:text-7xl">Projects</H1>
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
