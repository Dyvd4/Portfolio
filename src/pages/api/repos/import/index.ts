import GitHubRepoService from "@backend/services/GitHubRepoService";
import { NextApiRequest, NextApiResponse } from "next";
import config from "@config/config";

const { IMPORT_REPOS_CRON_ACCESS_TOKEN } = config;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const IMPORT_REPOS_CRON_ACCESS_TOKEN_FROM_REQUEST =
		req.headers.authorization?.split("Bearer ")[1];

	if (IMPORT_REPOS_CRON_ACCESS_TOKEN !== IMPORT_REPOS_CRON_ACCESS_TOKEN_FROM_REQUEST) {
		res.status(401).json("Not authenticated to trigger import route");
	} else {
		await GitHubRepoService.fetchRepos();
		res.json("Successfully imported repos from GitHub");
	}
}
