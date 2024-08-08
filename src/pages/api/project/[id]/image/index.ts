import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
	} = req;
	if (!id) return res.status(400).json("id has to be provided");

	if (req.method === "DELETE") {
		// delete in s3
		await prisma.$transaction(async (tx) => {
			const imageIds = (
				await tx.projectImage.findMany({
					where: {
						projectId: parseInt(id as string),
					},
					select: {
						fileId: true,
					},
				})
			).map((i) => i.fileId);
			await tx.projectImage.deleteMany({
				where: {
					fileId: {
						in: imageIds,
					},
				},
			});
			await tx.file.deleteMany({
				where: {
					id: {
						in: imageIds,
					},
				},
			});
		});
		return res.json("Successfully deleted project images");
	}
	return res.send(`${req.method} not supported`);
}
