import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const repos = await prisma.githubRepo.findMany();
	res.json(repos);
}
