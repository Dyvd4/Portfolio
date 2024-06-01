import ProjectService from "@backend/services/ProjectService";
import { isAuthenticated } from "@backend/utils/auth-utils";
import logger from "@lib/logger";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!(await isAuthenticated(req, res))) {
		return res.status(401).json("Not authenticated to access this route");
	}

	try {
		await ProjectService.fetchProjects();
	} catch (e) {
		logger.error("Error trying to fetch projects.", e);
		return res.status(500).json("Internal server error");
	}
	const responseMsg = "Successfully updated projects with repo data from GitHub";
	logger.info(responseMsg);
	return res.json(responseMsg);
}
