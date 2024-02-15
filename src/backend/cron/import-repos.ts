import GitHubRepoService from "@backend/services/GitHubRepoService";

export const handler = async () => {
	try {
		await GitHubRepoService.fetchRepos();
		console.log("Successfully imported repos from GitHub");
	} catch (err) {
		console.error(err);
	}
};
