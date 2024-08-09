import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { prisma } from "@prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const S3_PUBLIC_KEY = process.env.S3_PUBLIC_KEY!;
const S3_PRIVATE_KEY = process.env.S3_PRIVATE_KEY!;
const S3_REGION = process.env.S3_REGION!;
const FILE_SIGNED_URL_EXPIRING_IN_SECONDS = process.env.FILE_SIGNED_URL_EXPIRING_IN_SECONDS!;

const s3Client = new S3Client({
	credentials: {
		accessKeyId: S3_PUBLIC_KEY,
		secretAccessKey: S3_PRIVATE_KEY,
	},
	region: S3_REGION,
});

export const fileCreateSchema = z.object({
	fileName: z.string(),
	fileExtension: z.string(),
	mimeType: z.string(),
	size: z.number(),
});

export type FileCreateSchema = z.infer<typeof fileCreateSchema>;

/** Creates a file in the db and in s3, but only with the metadata.
 * The `presignedUrl` is the response from s3.
 * Use it as the url of a `PUT`-request with the binary data of the file as the body payload to upload the file-binaries to s3.
 * @see more here: https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_Scenario_PresignedUrl_section.html
 */
async function createWithPresignedUrl(fileToCreate: FileCreateSchema) {
	return prisma.$transaction(async (tx) => {
		const file = await tx.file.create({
			data: fileToCreate,
		});
		const filename = `${file.id}.${file.fileExtension}`;
		const presignedPost = await createPresignedPost(s3Client, {
			Bucket: S3_BUCKET_NAME,
			Key: filename,
			Fields: {
				"Content-Type": fileToCreate.mimeType,
				"x-amz-meta-file-id": file.id.toString(),
			},
			Expires: parseInt(FILE_SIGNED_URL_EXPIRING_IN_SECONDS),
		});
		return { presignedPost, id: file.id };
	});
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(405).send(`${req.method} not supported`);
	const { fileName, mimeType, size, fileExtension } = req.body;
	const fileToCreate = {
		fileName,
		mimeType,
		size,
		fileExtension,
	};
	try {
		fileCreateSchema.parse(fileToCreate);
	} catch (e) {
		return res.status(400).json(e as z.ZodError);
	}
	try {
		return res.json(await createWithPresignedUrl(fileToCreate));
	} catch (e) {
		console.error(e);
		return res.status(500).send("Unknown error");
	}
}
