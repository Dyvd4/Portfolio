"use client";
import Button from "@components/Button";
import { GalleryModal } from "@components/Gallery/GalleryModal";
import autoAnimate from "@formkit/auto-animate";
import { cn } from "@utils/component-utils";
import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentPropsWithRef, type PropsWithChildren } from "react";
import useKeypress from "react-use-keypress";

export type _TImage = {
	id: string;
	index: number;
	src: string;
};
export type TImage = {
	id: string;
	src: string;
};
type _GalleryProps = {
	images: TImage[];
};

export type GalleryProps = _GalleryProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _GalleryProps>;

export function Gallery({ images: propsImages, className, ...props }: GalleryProps) {
	const thumbnail = propsImages[0];
	const images: _TImage[] = propsImages.map((image, index) => ({ ...image, index })).slice(1);
	const [bottomImagesExpanded, setBottomImagesExpanded] = useState(false);
	const displayShowMoreButton = images.length > 6 && !bottomImagesExpanded;
	const [bottomImages, setBottomImages] = useState(
		displayShowMoreButton ? images.slice(0, 5) : images.slice(0, 6)
	);
	const [direction, setDirection] = useState(0);
	const [curIndex, setCurIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const onOpenChange = () => setIsOpen(!isOpen);

	useKeypress("ArrowRight", () => {
		if (curIndex + 1 < images.length) {
			changeCurrentIndex(curIndex + 1);
		}
	});

	useKeypress("ArrowLeft", () => {
		if (curIndex > 0) {
			changeCurrentIndex(curIndex - 1);
		}
	});

	const changeCurrentIndex = (newCurIndex: number) => {
		if (newCurIndex > curIndex) {
			setDirection(1);
		} else {
			setDirection(-1);
		}
		setCurIndex(newCurIndex);
	};

	const handleImageClick = (index: number) => {
		changeCurrentIndex(index);
		onOpenChange();
	};

	const expandBottomImages = () => {
		setBottomImagesExpanded(true);
		setBottomImages(images);
	};

	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			<Image
				className="aspect-video rounded-xl border drop-shadow-2xl dark:border-none"
				style={{ transform: "translate3d(0, 0, 0)" }}
				src={thumbnail.src}
				alt="gallery image"
				width={1920}
				height={1080}
			/>
			<div ref={(ref) => !!ref && autoAnimate(ref)} className="grid grid-cols-6 gap-4">
				{bottomImages.map((image, i) => (
					<Link
						onClick={() => handleImageClick(i)}
						key={image.id}
						href={{
							query: {
								imageId: image.id,
							},
						}}
						scroll={false}
						className="after:content after:shadow-highlight group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
					>
						<Image
							className="aspect-[3/2] transform rounded-lg object-cover brightness-90 transition will-change-auto hover:brightness-110"
							style={{ transform: "translate3d(0, 0, 0)" }}
							src={image.src}
							alt="gallery image"
							width={720}
							height={480}
						/>
					</Link>
				))}
				{displayShowMoreButton && (
					<>
						<Button onClick={() => expandBottomImages()} className="rounded-lg">
							Show more ({images.length - bottomImages.length})
						</Button>
					</>
				)}
			</div>
			<GalleryModal
				images={images}
				curIndex={curIndex}
				direction={direction}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				changeCurrentIndex={changeCurrentIndex}
			/>
		</div>
	);
}
