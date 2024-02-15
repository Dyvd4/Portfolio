import GitHubRepoService from "@backend/services/GitHubRepoService";
import { isAuthenticated } from "@backend/utils/auth-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!(await isAuthenticated(req, res))) {
		return res.status(401).json("Not authenticated to access this route");
	}

	await GitHubRepoService.fetchRepos();
	res.json("Successfully imported repos from GitHub");
}