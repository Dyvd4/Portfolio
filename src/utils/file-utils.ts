import { File as DBFile } from "@generated/prisma/client";
import request from "@utils/request-utils";

const NEXT_PUBLIC_FILE_API_PATH = process.env.NEXT_PUBLIC_FILE_API_PATH!;
const NEXT_PUBLIC_CDN_URL = process.env.NEXT_PUBLIC_CDN_URL!;

export const getDataUrl = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = (e) => {
			e.preventDefault();
			resolve(fileReader.result as string);
		};
		fileReader.onerror = (e) => {
			reject();
		};
	});
};

export const getFileBuffer = async (fileId: number): Promise<ArrayBuffer> => {
	const response = await request.get(`${NEXT_PUBLIC_FILE_API_PATH}/${fileId}`, {
		responseType: "arraybuffer",
	});
	return response.data as ArrayBuffer;
};

export const getImageUrl = (file: DBFile) => {
	const baseUrl = NEXT_PUBLIC_CDN_URL;
	return `${baseUrl}/${file.id}.${file.fileExtension}`;
};
