import GithubApi from "@backend/GithubApi";
import { prisma } from "@prisma";

type UserRepoResponse = {
	name: string;
	[key: string]: any;
};

export const fetchRepos = async () => {
	const response = (await GithubApi.get(`user/repos`)).data as UserRepoResponse[];
	await prisma.githubRepo.createMany({
		data: response.map((repo) => ({ name: repo.name })),
	});
};

const GitHubRepoService = {
	fetchRepos,
};

export default GitHubRepoService;
