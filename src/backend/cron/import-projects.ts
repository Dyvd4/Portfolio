import ProjectService from "@backend/services/ProjectService";

export const handler = async () => {
	try {
		await ProjectService.fetchProjects();
		console.log("Successfully updated projects with repo data from GitHub");
	} catch (err) {
		console.error(err);
	}
};
