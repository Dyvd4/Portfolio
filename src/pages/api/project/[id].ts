import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { addProjectSchema, ImageToUpload } from ".";

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

	const images = req.body.images as ImageToUpload[];

	switch (method) {
		case "PATCH":
			try {
				editProjectSchema.parse({ alias, additionalDescription, images });
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
						data: images.map((i) => ({
							fileId: i.id,
							projectId: updatedProject.id,
							isThumbnail: i.isThumbnail,
							sortOrder: i.sortOrder,
						})),
					});
					return res.json(updatedProject);
				});
			} catch (e) {
				console.error(e);
				await prisma.file.deleteMany({
					where: { id: { in: images.map((i) => i.id) } },
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
			return await prisma.$transaction(async (tx) => {
				const projectId = parseInt(id as string);
				const imageIds = (
					await tx.projectImage.findMany({
						where: {
							projectId,
						},
						select: {
							fileId: true,
						},
					})
				).map((i) => i.fileId);
				await tx.projectImage.deleteMany({
					where: {
						fileId: {
							in: imageIds,
						},
					},
				});
				await tx.file.deleteMany({
					where: {
						id: {
							in: imageIds,
						},
					},
				});
				const deletedProject = await tx.project.delete({
					where: {
						id: projectId,
					},
				});
				return res.json(deletedProject);
			});
		default:
			return res.send(`${req.method} not supported`);
	}
}
