import { authOptions } from "@pages/api/auth/[...nextauth]";
import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.send("You have to be singed in");
  if (req.method !== "POST") return res.send("Handler only accepts POST");
  const { id, name, alias } = req.body;
  if (!id && !name && !alias)
    return res.status(400).json("Please fill in required fields");
  const projectExists = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  if (projectExists) {
    return res.status(400).json("Project already exists");
  }
  const newProject = await prisma.project.create({
    data: {
      id,
      name,
      alias,
    },
  });
  return res.status(200).json(newProject);
}
