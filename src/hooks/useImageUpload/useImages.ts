import { Prisma } from "@prisma/client";
import { useState } from "react";

export type Image = {
	id: number;
	isThumbnail: boolean;
	raw: File;
	name: string;
	mimeType: string;
	dataUrl: string;
	size: number;
};

const projectWithImages = Prisma.validator<Prisma.ProjectDefaultArgs>()({
	include: { images: { include: { file: true } } },
});

export type ProjectWithImages = Prisma.ProjectGetPayload<typeof projectWithImages>;

export const useImages = () => {
	const [images, setImages] = useState<Image[]>([]);
	return {
		images,
		remove: (imageToRemove: Image) => {
			setImages((state) => {
				const newImages = images.filter((image) => image.id !== imageToRemove.id);
				if (newImages.every((i) => !i.isThumbnail) && newImages[0]) {
					newImages[0].isThumbnail = true;
				}
				return newImages;
			});
		},
		setImages: (images: Image[]) => {
			const newImages = [...images];
			if (images.every((i) => !i.isThumbnail) && images[0]) {
				images[0].isThumbnail = true;
			}
			setImages(newImages);
		},
	};
};
