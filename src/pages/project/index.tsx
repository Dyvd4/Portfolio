import Badge from "@components/Badge";
import Card from "@components/Card";
import IconLink from "@components/IconLink";
import Input from "@components/Input";
import LoadingCircle from "@components/LoadingCircle";
import Tooltip from "@components/Tooltip";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { prisma } from "@prisma";
import Link from "next/link";
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

	const [projects, setProjects] = useState(initialProjects);
	const [projectsAreLoading, setProjectsAreLoading] = useState(false);
	const [projectOrTagname, setProjectName] = useState("");
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [setParentRef] = useAutoAnimate();

	const fetchProjects = useCallback(async (projectOrTagname?: string) => {
		setProjectsAreLoading(true)
		const response = await fetch(`/api/projects?projectOrTagname=${projectOrTagname}`);
		const projects = await response.json();
		setProjects(projects)
		setProjectsAreLoading(false)
	}, [])

	useEffect(() => {
		if (!isInitialLoad) fetchProjects(projectOrTagname);
		setIsInitialLoad(false)
	}, [projectOrTagname, fetchProjects]);

	return (
		<div className="max-w-sm mx-auto">
			<h1 className='text-7xl font-black text-center'>
				Projects
			</h1>
			<Input
				value={projectOrTagname}
				onChange={(e) => setProjectName(e.target.value)}
				type="text"
				name="projectOrTagname"
				placeholder="search by project name or tag..."
				className="border-2 rounded-md border-black mt-20"
			/>
			<ul
				ref={setParentRef}
				className="flex flex-col gap-4 mt-20 items-center">
				{projectsAreLoading && <>
					<LoadingCircle />
				</>}
				{!projectsAreLoading && projects.length === 0 && <>
					No projects found 😴
				</>}
				{!projectsAreLoading && projects.length > 0 && <>
					{(projects).map((project) => (
						<li className="w-full flex justify-center" key={project.id}>
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
						</li>
					))}
				</>}
			</ul>
		</div>
	)
}

export default Projects;