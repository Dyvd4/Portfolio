import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { addProjectSchema } from ".";

const editProjectSchema = addProjectSchema.omit({ name: true });

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "5mb",
		},
	},
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
		method,
		body: { alias, additionalDescription },
	} = req;

	const imageIds = req.body.imageIds as number[];

	switch (method) {
		case "PATCH":
			try {
				editProjectSchema.parse({ alias, additionalDescription, imageIds });
			} catch (e) {
				console.error(e);
				if (e instanceof z.ZodError) {
					return res.status(400).json((e as z.ZodError).format());
				}
			}
			try {
				return await prisma.$transaction(async (tx) => {
					const updatedProject = await prisma.project.update({
						where: {
							id: parseInt(id as string),
						},
						data: {
							alias,
							additionalDescription,
						},
					});
					await tx.projectImage.createMany({
						data: imageIds.map((id) => ({
							fileId: id,
							projectId: updatedProject.id,
						})),
					});
					return res.json(updatedProject);
				});
			} catch (e) {
				console.error(e);
				await prisma.file.deleteMany({
					where: { id: { in: imageIds } },
				});
				return res.status(500).json("An unknown error occurred");
			}
		case "GET":
			const project = await prisma.project.findFirst({
				where: {
					id: parseInt(id as string),
				},
				include: {
					images: {
						include: {
							file: true,
						},
					},
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
