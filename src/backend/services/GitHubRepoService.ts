import GithubApi from "@backend/GithubApi";
import config from "@config/config";
import { prisma } from "@prisma";

const { GH_REPO_OWNER } = config;

type UserRepoResponse = {
	name: string;
	owner: {
		login: string;
	};
	[key: string]: any;
};

export const fetchRepos = async () => {
	const response = (await GithubApi.get(`user/repos`)).data as UserRepoResponse[];
	await prisma.githubRepo.deleteMany();
	await prisma.githubRepo.createMany({
		data: response
			.filter((repo) => repo.owner.login === GH_REPO_OWNER)
			.map((repo) => ({ name: repo.name })),
	});
};

const GitHubRepoService = {
	fetchRepos,
};

export default GitHubRepoService;
