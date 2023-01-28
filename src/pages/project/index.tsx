import Badge from "@components/Badge";
import Card from "@components/Card";
import Input from "@components/Input";
import LoadingCircle from "@components/LoadingCircle";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { prisma } from "@prisma";
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
	const [parent] = useAutoAnimate();

	const fetchProjects = useCallback(async (projectOrTagName?: string) => {
		if (!projectOrTagName) {
			setProjectsAreLoading(true)
			const response = await fetch(`/api/projects`);
			const projects = await response.json();
			setProjects(projects)
			setProjectsAreLoading(false)
			return;
		}
		setProjectsAreLoading(true)
		const response = await fetch(`/api/projects?projectOrTagname=${projectOrTagname}`);
		const projects = await response.json();
		setProjects(projects)
		setProjectsAreLoading(false)
	}, [projectOrTagname])

	useEffect(() => {
		fetchProjects(projectOrTagname)
	}, [projectOrTagname, fetchProjects]);

	return (
		<div className="max-w-sm mx-auto">
			<div className="text-center">
				<h1 className='text-7xl font-black'>
					Projects
				</h1>
			</div>
			<Input
				value={projectOrTagname}
				onChange={(e) => setProjectName(e.target.value)}
				type="text"
				name="projectOrTagname"
				placeholder="search by project name or tag..."
				className="border-2 rounded-md border-black mt-20"
			/>
			<ul
				ref={parent}
				className="flex flex-col gap-4 mt-20 items-center">
				{projectsAreLoading && <>
					<LoadingCircle />
				</>}
				{!projectsAreLoading && <>
					{(projects).map((project) => (
						<li className="w-full flex justify-center" key={project.id}>
							<Card
								className="flex-grow"
								href={`/project/${project.id}`}
								title={project.alias}
								description={project.description || "No description available"}
								tags={project.tags.length > 0
									? <>
										{project.tags.map(tag => (
											<Badge key={tag.name} className="mt-2">
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