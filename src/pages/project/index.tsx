import Badge from "@components/Badge";
import Button from "@components/Button";
import Card from "@components/Card";
import IconLink from "@components/IconLink";
import Input from "@components/Input";
import LoadingCircle from "@components/LoadingCircle";
import useModalDisclosure from "@components/Modal/hooks/useModalDisclosure";
import AddProjectModal from "@components/Modals/Project/AddProjectModal";
import DeleteProjectModal from "@components/Modals/Project/DeleteProjectModal";
import EditProjectModal from "@components/Modals/Project/EditProjectModal";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDebounce from "@hooks/useDebounce";
import { prisma } from "@prisma";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

export async function getServerSideProps() {
	const projects = await prisma.project.findMany({
		include: {
			tags: true
		}
	});
	return {
		props: {
			projects: JSON.parse(JSON.stringify(projects)) as typeof projects
		}
	}
}

type ProjectsProps = {} & Awaited<ReturnType<typeof getServerSideProps>>["props"]

function Projects({ projects: initialProjects, ...props }: ProjectsProps) {

	useBreadcrumb([
		{
			isHome: true
		},
		{
			children: "projects",
			isCurrentPage: true
		}
	]);

	const { isActive: projectEditModalIsActive, open: openProjectEditModal, close: closeProjectEditModal } = useModalDisclosure()
	const { isActive: projectDeleteModalIsActive, open: openProjectDeleteModal, close: closeProjectDeleteModal } = useModalDisclosure()
	const { isActive: projectAddModalIsActive, open: openProjectAddModal, close: closeProjectAddModal } = useModalDisclosure()
	const [projectIdToEdit, setProjectIdToEdit] = useState<number | undefined>();
	const { status } = useSession()
	const [projects, setProjects] = useState(initialProjects);
	const [projectsAreLoading, setProjectsAreLoading] = useState(false);
	const [projectOrTagname, setProjectName] = useState("");
	const { value: debouncedProjectOrTagname, isDebouncing } = useDebounce(projectOrTagname);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [setParentRef] = useAutoAnimate();

	const handleProjectEdit = (projectId: number) => {
		setProjectIdToEdit(projectId);
		openProjectEditModal();
	}
	const handleProjectDelete = (projectId: number) => {
		setProjectIdToEdit(projectId);
		openProjectDeleteModal();
	}

	const fetchProjects = useCallback(async (projectOrTagname?: string) => {
		setProjectsAreLoading(true)
		const response = await fetch(`/api/projects?projectOrTagname=${projectOrTagname}`);
		const projects = await response.json();
		setProjects(projects)
		setProjectsAreLoading(false)
	}, [])

	useEffect(() => {
		if (!isInitialLoad) fetchProjects(debouncedProjectOrTagname);
		setIsInitialLoad(false)
	}, [debouncedProjectOrTagname, fetchProjects]);

	return (
		<>
			<Head>
				<title>My projects</title>
				<meta name="description" content="Overview of my coding projects. Most of them should be available on GitHub." />
				<meta name="keywords" content="Web app, coding, projects, GitHub, David Kimmich" />
			</Head>
			<main className="max-w-sm mx-auto">
				<h1 className='text-6xl sm:text-7xl font-black text-center'>
					Projects
					{status === "authenticated" && <>
						<Button onClick={openProjectAddModal}>Add project</Button>
					</>}
				</h1>
				<Input
					value={projectOrTagname}
					onChange={(e) => setProjectName(e.target.value)}
					type="text"
					name="projectOrTagname"
					placeholder="search by project name or tag..."
					className="border-2 rounded-md mt-12"
				/>
				<ul
					ref={setParentRef}
					className="flex flex-col gap-6 my-12 items-center">
					{projectsAreLoading || isDebouncing && <>
						<LoadingCircle />
					</>}
					{!projectsAreLoading && !isDebouncing && projects.length === 0 && <p>
						No projects found 😴
					</p>}
					{!projectsAreLoading && !isDebouncing && projects.length > 0 && <>
						{(projects).map((project) => (
							<li className="w-full flex justify-center gap-4" key={project.id}>
								<Card
									className="flex-grow"
									title={<>
										<IconLink href={`/project/${project.id}`}>
											{project.alias}
										</IconLink>
									</>}
									description={project.description || "No description available"}
									tags={project.tags.length > 0
										? <>
											{project.tags.map(tag => (
												<Badge key={tag.name}>
													{tag.name}
												</Badge>
											))}
										</>
										: undefined
									}
								/>
								{status === "authenticated" && <>
									<div className="flex gap-4 justify-center h-fit">
										<Button onClick={() => handleProjectDelete(project.id)}>Delete</Button>
										<Button onClick={() => handleProjectEdit(project.id)}>Edit</Button>
									</div>
								</>}
							</li>
						))}
					</>}
				</ul>
			</main>
			{status === "authenticated" && <>
				<AddProjectModal isActive={projectAddModalIsActive} close={closeProjectAddModal} />
				<EditProjectModal isActive={projectEditModalIsActive} close={closeProjectEditModal} projectId={projectIdToEdit} />
				<DeleteProjectModal isActive={projectDeleteModalIsActive} close={closeProjectDeleteModal} projectId={projectIdToEdit} />
			</>}
		</>
	)
}

export default Projects;