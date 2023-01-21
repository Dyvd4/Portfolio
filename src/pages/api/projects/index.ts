import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const projects = await prisma.project.findMany({
        include: {
            tags: true,
            commits: true,
            languages: true
        }
    });
    res.json(projects);
}