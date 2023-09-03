import ProjectService from "@backend/services/ProjectService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await ProjectService.fetchProjects();
	res.json("Successfully updated projects with repo data from GitHub");
}
