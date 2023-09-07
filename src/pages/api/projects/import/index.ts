import ProjectService from "@backend/services/ProjectService";
import { isAuthenticated } from "@backend/utils/auth-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!isAuthenticated(req, res))
		return res.status(401).json("Not authenticated to access this route");

	await ProjectService.fetchProjects();
	res.json("Successfully updated projects with repo data from GitHub");
}
