import path from "path";
import fs from "fs";

export const getProjectFallbackImageDataUrl = () => {
	const fallbackImageFilePath = path.join(process.cwd(), "public", "Project_fallback.png");
	const fallbackImageFileUrl = `data:image/png;base64,${fs
		.readFileSync(fallbackImageFilePath)
		.toString("base64")}`;
	return fallbackImageFileUrl;
};
