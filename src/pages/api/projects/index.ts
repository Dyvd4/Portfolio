import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const projectOrTagname = req.query.projectOrTagname;

	if (projectOrTagname instanceof Array) {
		return res.status(400).json("projectOrTagname must be a string");
	}

	const projects = await prisma.project.findMany({
		where: {
			OR: projectOrTagname
				? [
						{
							name: {
								startsWith: projectOrTagname,
							},
						},
						{
							tags: {
								some: {
									name: {
										startsWith: projectOrTagname,
									},
								},
							},
						},
				  ]
				: undefined,
		},
		include: {
			tags: true,
		},
	});

	res.json(projects);
}
