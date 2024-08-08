import FileInput from "@components/FileInput";
import XCircle from "@components/Icons/XCircle";
import { cn } from "@utils/component-utils";
import { getDataUrl } from "@utils/file-utils";
import Image from "next/image";
import { ComponentPropsWithRef, MutableRefObject, PropsWithChildren } from "react";
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
			<div className="invisible absolute right-0 top-0 z-10 flex cursor-pointer p-1 text-red-500 opacity-0 group-hover:visible group-hover:opacity-100">
				<XCircle onClick={() => onRemove(image)} />
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
};

export type ImagesSectionProps = _ImagesSectionProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ImagesSectionProps>;

function ImagesSection({
	className,
	children,
	fileRef,
	images,
	setImages,
	...props
}: ImagesSectionProps) {
	const handleFileInputChange = async (files: FileList | null) => {
		if (!files) return;
		const newImages: TImage[] = [...images];
		await Promise.all(
			Array.from(files).map(async (file, idx) => {
				newImages.push({
					id: 0,
					isThumbnail: false,
					raw: file,
					name: file.name,
					mimeType: file.type,
					dataUrl: await getDataUrl(file),
					size: file.size,
				});
				return null;
			})
		);

		setImages(newImages.map((f, idx) => ({ ...f, id: idx })));
	};

	const handleOnRemove = (image: TImage) => {
		setImages(images.filter((i) => i.id !== image.id));
	};

	const handleOnSetThumbnail = (image: TImage) => {
		const newImages = [...images];
		newImages.forEach((image) => {
			image.isThumbnail = false;
		});
		const thumbImage = newImages.find((i) => i.id === image.id);
		thumbImage!.isThumbnail = true;
		setImages(newImages);
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
			<div className="grid grid-cols-3 gap-4">
				{images.map((image) => (
					<EditImage
						image={image}
						key={image.id}
						onRemove={handleOnRemove}
						onSetThumbnail={handleOnSetThumbnail}
					/>
				))}
			</div>
		</div>
	);
}

export default ImagesSection;
