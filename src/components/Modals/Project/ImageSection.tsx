import FileInput from "@components/FileInput";
import XCircle from "@components/Icons/XCircle";
import { cn } from "@utils/component-utils";
import Image from "next/image";
import { ComponentPropsWithRef, MutableRefObject, PropsWithChildren } from "react";
import { ReactSortable } from "react-sortablejs";
import { type Image as TImage } from "../../../hooks/useImageUpload/useImages";

type EditImageProps = {
	image: TImage;
	onRemove(image: TImage): void;
	onSetThumbnail(image: TImage): void;
};
const EditImage = ({ image, onRemove, onSetThumbnail }: EditImageProps) => {
	return (
		<div
			className={cn(
				"group relative aspect-square cursor-pointer overflow-hidden rounded-md border-2"
			)}
		>
			<div
				onClick={() => onSetThumbnail(image)}
				className="invisible absolute inset-0 z-10 bg-black/70 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
			></div>
			<div className="invisible absolute top-0 right-0 z-10 flex cursor-pointer p-1 opacity-0 group-hover:visible group-hover:opacity-100">
				<XCircle className="[&>path]:stroke-white!" onClick={() => onRemove(image)} />
			</div>
			<Image className="object-cover" fill alt="place image" src={image.dataUrl} />
			{image.isThumbnail && (
				<div className="absolute bottom-0 z-20 w-full bg-black/70 p-2 text-center text-sm text-white">
					Thumbnail
				</div>
			)}
		</div>
	);
};

type _ImagesSectionProps = {
	fileRef: MutableRefObject<HTMLInputElement | null>;
	images: TImage[];
	setImages(this: void, images: TImage[]): void;
	remove(imageToRemove: TImage): void;
	setThumbnail(image: TImage): void;
	addFromFileList(files: FileList): void;
};

export type ImagesSectionProps = _ImagesSectionProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ImagesSectionProps>;

function ImagesSection({
	className,
	children,
	fileRef,
	images,
	setImages,
	remove,
	setThumbnail,
	addFromFileList,
	...props
}: ImagesSectionProps) {
	const handleFileInputChange = async (files: FileList | null) => {
		if (!files) return;
		addFromFileList(files);
	};

	const handleOnRemove = (image: TImage) => {
		remove(image);
	};

	const handleOnSetThumbnail = (image: TImage) => {
		setThumbnail(image);
	};

	return (
		<div className={cn(`flex flex-col gap-4`, className)} {...props}>
			<FileInput
				ref={fileRef}
				accept="image/*"
				multiple
				onChange={(e) => {
					handleFileInputChange((e.target as HTMLInputElement).files);
				}}
			/>
			<ReactSortable className="grid grid-cols-3 gap-4" list={images} setList={setImages}>
				{images.map((image) => (
					<EditImage
						image={image}
						key={image.id}
						onRemove={handleOnRemove}
						onSetThumbnail={handleOnSetThumbnail}
					/>
				))}
			</ReactSortable>
		</div>
	);
}

export default ImagesSection;
