"use client";
import Button from "@components/Button";
import { GalleryModal } from "@components/Gallery/GalleryModal";
import { NAVBAR_TOP_THRESHOLD, useNavbarStore } from "@components/Navbar/Navbar";
import autoAnimate from "@formkit/auto-animate";
import useActiveBreakPoints from "@hooks/useActiveBreakPoints";
import { cn } from "@utils/component-utils";
import Image from "next/image";
import { useEffect, useState, type ComponentPropsWithRef, type PropsWithChildren } from "react";
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
	const images: _TImage[] = propsImages.map((image, index) => ({ ...image, index }));
	const [bottomImagesExpanded, setBottomImagesExpanded] = useState(false);
	const {
		sm: smBreakpointHit,
		md: mdBreakpointHit,
		loaded: breakpointLoaded,
	} = useActiveBreakPoints();
	const [bottomImages, setBottomImages] = useState<_TImage[]>([]);
	const maxBottomImages = mdBreakpointHit ? 6 : smBreakpointHit ? 4 : 3;
	const displayShowMoreButton =
		images.length - 1 > maxBottomImages && !bottomImagesExpanded && breakpointLoaded;
	const getBottomImages = () => {
		return displayShowMoreButton ? images.slice(1, maxBottomImages) : images.slice(1);
	};
	useEffect(() => {
		if (breakpointLoaded) {
			setBottomImages(getBottomImages());
		}
	}, [smBreakpointHit, mdBreakpointHit, breakpointLoaded]);

	const [direction, setDirection] = useState(0);
	const [curIndex, setCurIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const { setClassName } = useNavbarStore();
	const onOpenChange = () => {
		const newIsOpen = !isOpen;
		if (newIsOpen) {
			window.scrollTo({
				top: NAVBAR_TOP_THRESHOLD + 1,
			});
			setClassName("z-0");
		} else {
			setClassName("z-50");
		}
		setIsOpen(newIsOpen);
	};

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
		setBottomImages(images.slice(1));
	};

	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			<Image
				onClick={() => handleImageClick(0)}
				className="aspect-video cursor-zoom-in rounded-xl border drop-shadow-2xl dark:border-none"
				style={{ transform: "translate3d(0, 0, 0)" }}
				src={thumbnail.src}
				alt="gallery image"
				width={1920}
				height={1080}
			/>
			<div
				ref={(ref) => !!ref && autoAnimate(ref)}
				className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6"
			>
				{bottomImages.map((image, i) => (
					<div
						onClick={() => handleImageClick(i + 1)}
						key={image.id}
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
					</div>
				))}
				{displayShowMoreButton && (
					<>
						<Button
							onClick={() => expandBottomImages()}
							className="flex flex-col items-center justify-center rounded-lg"
						>
							<div className="whitespace-nowrap">Show more</div>
							<div>({images.length - 1 - bottomImages.length})</div>
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
