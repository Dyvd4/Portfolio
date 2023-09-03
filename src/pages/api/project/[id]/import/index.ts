import ProjectService from "@backend/services/ProjectService";
import { NextApiRequest, NextApiResponse } from "next";
import config from "@config/config";
import { prisma } from "@prisma";

const { IMPORT_PROJECTS_CRON_ACCESS_TOKEN } = config;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
	} = req;
	const IMPORT_PROJECTS_CRON_ACCESS_TOKEN_FROM_REQUEST =
		req.headers.authorization?.split("Bearer ")[1];

	if (IMPORT_PROJECTS_CRON_ACCESS_TOKEN !== IMPORT_PROJECTS_CRON_ACCESS_TOKEN_FROM_REQUEST) {
		res.status(401).json("Not authenticated to trigger import route");
	} else {
		const project = await prisma.project.findUnique({
			where: {
				id: parseInt(id as string),
			},
		});
		if (!project) return res.status(404).json("Project not found");
		await ProjectService.fetchProject(project);
		res.json("Successfully updated projects with repo data from GitHub");
	}
}
