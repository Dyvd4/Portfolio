import { Prisma } from "@prisma/client";
import { getDataUrl } from "@utils/file-utils";
import { useState } from "react";

export type Image = {
	id: number;
	isThumbnail: boolean;
	raw: File;
	name: string;
	mimeType: string;
	dataUrl: string;
	size: number;
	sortOrder: number;
};

const projectWithImages = Prisma.validator<Prisma.ProjectDefaultArgs>()({
	include: { images: { include: { file: true } } },
});

export type ProjectWithImages = Prisma.ProjectGetPayload<typeof projectWithImages>;

export const useImages = () => {
	const [images, _setImages] = useState<Image[]>([]);

	function setImages(images: Image[]) {
		const newImages = [...images];
		const thumbnailIdx = newImages.findIndex((i) => i.isThumbnail);
		if (thumbnailIdx > -1) {
			const thumbnail = newImages.splice(thumbnailIdx, 1)[0];
			newImages.unshift(thumbnail);
		}
		if (newImages.every((i) => !i.isThumbnail) && newImages[0]) {
			newImages[0].isThumbnail = true;
		}
		_setImages(newImages.map((image, idx) => ({ ...image, sortOrder: idx })));
	}

	return {
		images,
		remove: (image: Image) => {
			setImages(images.filter((i) => i.id !== image.id));
		},
		setImages,
		setThumbnail(image: Image) {
			const newImages = [...images];
			newImages.forEach((image) => {
				image.isThumbnail = false;
			});
			const thumbImage = newImages.find((i) => i.id === image.id);
			thumbImage!.isThumbnail = true;
			setImages(newImages);
		},
		async addFromFileList(files: FileList) {
			const newImages: Image[] = [...images];
			await Promise.all(
				Array.from(files).map(async (file, idx) => {
					newImages.push({
						id: idx,
						isThumbnail: false,
						raw: file,
						name: file.name,
						mimeType: file.type,
						dataUrl: await getDataUrl(file),
						size: file.size,
						sortOrder: 0,
					});
					return null;
				})
			);
			setImages(newImages);
		},
	};
};
