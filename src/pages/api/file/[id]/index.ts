import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const S3_PUBLIC_KEY = process.env.S3_PUBLIC_KEY!;
const S3_PRIVATE_KEY = process.env.S3_PRIVATE_KEY!;
const S3_REGION = process.env.S3_REGION!;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!;

const s3Client = new S3Client({
	credentials: {
		accessKeyId: S3_PUBLIC_KEY,
		secretAccessKey: S3_PRIVATE_KEY,
	},
	region: S3_REGION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id: fileId },
	} = req;
	if (!fileId) {
		return NextResponse.json({ message: "You have to provide a fileId" }, { status: 400 });
	}
	if (req.method === "GET") {
		const dbFile = await prisma.file.findUnique({
			where: {
				id: parseInt(fileId as string),
			},
		});

		if (!dbFile) {
			return res.status(404).json("File not found");
		}

		const response = await s3Client.send(
			new GetObjectCommand({
				Bucket: S3_BUCKET_NAME,
				Key: `${dbFile.id}.${dbFile.fileName.split(".").pop()!.toLowerCase()}`,
			})
		);

		const fileBuffer = Buffer.from(await response.Body!.transformToByteArray());
		res.setHeader("Content-Type", response.ContentType!);
		return res.send(fileBuffer);
	}

	return res.send(`${req.method} not supported`);
}
