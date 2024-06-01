import GitHubRepoService from "@backend/services/GitHubRepoService";
import { isAuthenticated } from "@backend/utils/auth-utils";
import logger from "@lib/logger";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!(await isAuthenticated(req, res))) {
		return res.status(401).json("Not authenticated to access this route");
	}

	try {
		await GitHubRepoService.fetchRepos();
	} catch (e) {
		logger.error(e);
		return res.status(500).json("Internal server error");
	}
	const responseMsg = "Successfully imported repos from GitHub";
	logger.info(responseMsg);
	return res.json(responseMsg);
}
