import { getProjectFallbackImageDataUrl } from "@backend/utils/file-utils";
import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { addProjectSchema } from ".";

const editProjectSchema = addProjectSchema.omit({ name: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
		method,
		body: { alias, imageUrl: bodyImageUrl },
	} = req;

	switch (method) {
		case "PATCH":
			try {
				editProjectSchema.parse({ alias, imageUrl: bodyImageUrl });
				const imageUrl = bodyImageUrl || getProjectFallbackImageDataUrl();
				const updatedProject = await prisma.project.update({
					where: {
						id: parseInt(id as string),
					},
					data: {
						alias,
						imageUrl,
					},
				});
				return res.json(updatedProject);
			} catch (e) {
				if (e instanceof z.ZodError) {
					return res.status(400).json((e as z.ZodError).format());
				}
				console.error(e);
				return res.status(500).json("An unknown error occurred");
			}
		case "GET":
			const project = await prisma.project.findFirst({
				where: {
					id: parseInt(id as string),
				},
			});
			return res.json(project);
		case "DELETE":
			const deletedProject = await prisma.project.delete({
				where: {
					id: parseInt(id as string),
				},
			});
			return res.json(deletedProject);
		default:
			return res.send(`${req.method} not supported`);
	}
}
