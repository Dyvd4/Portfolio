import ProjectService from "@backend/services/ProjectService";
import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
	} = req;
	const project = await prisma.project.findUnique({
		where: {
			id: parseInt(id as string),
		},
	});
	if (!project) return res.status(404).json("Project not found");
	await ProjectService.fetchProject(project);
	res.json("Successfully updated project with repo data from GitHub");
}
