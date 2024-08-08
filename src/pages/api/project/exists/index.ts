import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const name = req.query.name as string;
	try {
		z.string().parse(name);
	} catch (e) {
		return res.status(400).json(e as z.ZodError);
	}
	const project = await prisma.project.findUnique({
		where: {
			name,
		},
	});
	return res.json(!!project);
}
