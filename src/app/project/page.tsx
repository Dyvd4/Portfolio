import { getLatestProjects } from "@pages/api/projects";
import ProjectPage from "./project-page";

async function Projects() {
	const latestProjects = await getLatestProjects();
	return <ProjectPage initialProjects={latestProjects} />;
}

export default Projects;
