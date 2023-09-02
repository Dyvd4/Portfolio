import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const addProjectSchema = z.object({
	name: z.string().nonempty(),
	alias: z.string().nonempty(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
		body: { name, alias },
	} = req;

	switch (method) {
		case "POST":
			try {
				addProjectSchema.parse({ name, alias });
				const projectExists = await prisma.project.findUnique({
					where: {
						name,
					},
				});
				if (projectExists) {
					return res.status(400).json("Project already exists");
				}
				const newProject = await prisma.project.create({
					data: {
						name,
						alias,
					},
				});
				return res.status(200).json(newProject);
			} catch (e) {
				if (e instanceof z.ZodError) {
					return res.status(400).json((e as z.ZodError).format());
				}
				console.error(e);
				return res.status(500).json("An unknown error occurred sending the mail");
			}
	}
}
