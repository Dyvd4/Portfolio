import { Prisma } from "@prisma/client";
import { create } from "zustand";

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

type ImageStore = {
	images: Image[];
	add(this: void, image: Image): void;
	remove(this: void, imageToRemove: Image): void;
	setImages(this: void, images: Image[]): void;
};

export const useImageStore = create<ImageStore>((set) => ({
	images: [],
	add: (image: Image) => set((state) => ({ images: [...state.images, image] })),
	remove: (imageToRemove: Image) => {
		set((state) => {
			const newImages = state.images.filter((image) => image.id !== imageToRemove.id);
			if (newImages.every((i) => !i.isThumbnail) && newImages[0]) {
				newImages[0].isThumbnail = true;
			}
			return {
				...state,
				images: newImages,
			};
		});
	},
	setImages: (images: Image[]) => {
		if (images.every((i) => !i.isThumbnail) && images[0]) {
			images[0].isThumbnail = true;
		}
		set((state) => ({ ...state, images, isLoading: false }));
	},
}));
