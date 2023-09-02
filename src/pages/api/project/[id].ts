import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const editProjectSchema = z.object({
  alias: z.string().nonempty(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
    body: { alias },
  } = req;

  switch (method) {
    case "PATCH":
      try {
        editProjectSchema.parse({ alias });
        const updatedProject = await prisma.project.update({
          where: {
            id: parseInt(id as string),
          },
          data: {
            alias,
          },
        });
        return res.json(updatedProject);
      } catch (e) {
        if (e instanceof z.ZodError) {
          return res.status(400).json((e as z.ZodError).format());
        }
        console.error(e);
        return res.status(500).json("An unknown error occurred");
      }

    case "DELETE":
      const deletedProject = await prisma.project.delete({
        where: {
          id: parseInt(id as string),
        },
      });
      return res.json(deletedProject);
    case "GET":
      const project = await prisma.project.findFirst({
        where: {
          id: parseInt(id as string),
        },
      });
      return res.json(project);
    default:
      return res.send(`${req.method} not supported`);
  }
}
