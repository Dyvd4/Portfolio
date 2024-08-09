import ProjectService from "@backend/services/ProjectService";
import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const pleaseSelect = "Please select";
export const addProjectSchema = z.object({
	name: z
		.string()
		.min(1)
		.refine((val) => val !== pleaseSelect, {
			message: `String cannot be "${pleaseSelect}"`,
		}),
	alias: z.string().min(1),
	images: z
		.array(
			z.object({
				id: z.number(),
				isThumbnail: z.boolean(),
				sortOrder: z.number(),
			})
		)
		.optional(),
	additionalDescription: z.string().nullable(),
});

export type ImageToUpload = { id: number; isThumbnail: boolean; sortOrder: number };

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "5mb",
		},
	},
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
		body: { name, alias, additionalDescription },
	} = req;

	const images = req.body.images as ImageToUpload[];

	switch (method) {
		case "POST":
			try {
				addProjectSchema.parse({
					name,
					alias,
					imageIds: images,
					additionalDescription,
				});
			} catch (e) {
				console.error(e);
				return res.status(400).json((e as z.ZodError).format());
			}

			const projectExists = await prisma.project.findUnique({
				where: {
					name,
				},
			});
			if (projectExists) {
				return res.status(400).json("Project already exists");
			}

			try {
				let newProject;
				await prisma.$transaction(async (tx) => {
					newProject = await tx.project.create({
						data: {
							name,
							alias,
							additionalDescription,
						},
					});
					await tx.projectImage.createMany({
						data: images.map((i) => ({
							fileId: i.id,
							projectId: newProject.id,
							isThumbnail: i.isThumbnail,
							sortOrder: i.sortOrder,
						})),
					});
				});
				await ProjectService.fetchProject(newProject);
				return res.status(200).json(newProject);
			} catch (e) {
				await prisma.file.deleteMany({
					where: { id: { in: images.map((i) => i.id) } },
				});
				console.error(e);
				return res.status(500).json("An unknown error occurred");
			}
	}
}
