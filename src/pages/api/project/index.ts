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
	imageIds: z.array(z.number()).optional(),
	additionalDescription: z.string().nullable(),
});

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

	const imageIds = req.body.imageIds as number[];

	switch (method) {
		case "POST":
			try {
				addProjectSchema.parse({
					name,
					alias,
					imageIds,
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
						data: imageIds.map((id) => ({
							fileId: id,
							projectId: newProject.id,
						})),
					});
				});
				await ProjectService.fetchProject(newProject);
				return res.status(200).json(newProject);
			} catch (e) {
				await prisma.file.deleteMany({
					where: { id: { in: imageIds } },
				});
				console.error(e);
				return res.status(500).json("An unknown error occurred");
			}
	}
}
