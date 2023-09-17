import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
	} = req;
	if (!id) res.status(400).json("id has to be provided");
	const project = await prisma.project.findUnique({
		where: {
			id: parseInt(id as string),
		},
	});
	if (!project) return res.status(404).json("project not found");
	const imageDataUrl = project.imageUrl;
	const contentType = imageDataUrl!.split("data:")[1].split(";")[0];
	res.setHeader("Content-Type", contentType);
	res.setHeader("Content-Disposition", `inline"`);
	const imageData = imageDataUrl!.split(",")[1];
	const imageBuffer = Buffer.from(imageData, "base64");
	res.send(imageBuffer);
}
