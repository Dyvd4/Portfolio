import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, Download, ExternalLink, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "./animationVariants";
import { type _TImage } from "./Gallery";

function forceDownload(blobUrl: string, filename: string) {
	const a: any = document.createElement("a");
	a.download = filename;
	a.href = blobUrl;
	document.body.appendChild(a);
	a.click();
	a.remove();
}

function downloadImage(url: string, filename: string) {
	fetch(url, {
		headers: new Headers({
			Origin: location.origin,
		}),
		mode: "cors",
	})
		.then((response) => response.blob())
		.then((blob) => {
			const blobUrl = window.URL.createObjectURL(blob);
			forceDownload(blobUrl, filename);
		})
		.catch((e) => console.error(e));
}

const range = (start: number, end: number): number[] => {
	const output: number[] = [];
	if (typeof end === "undefined") {
		end = start;
		start = 0;
	}
	for (let i = start; i < end; i += 1) {
		output.push(i);
	}
	return output;
};

export interface GalleryModalContentProps {
	curIndex: number;
	images: _TImage[];
	changeCurrentIndex: (newVal: number) => void;
	closeModal: () => void;
	navigation: boolean;
	direction?: number;
}

export default function GalleryModalContent({
	curIndex,
	images,
	changeCurrentIndex,
	closeModal,
	direction,
}: GalleryModalContentProps) {
	const [loaded, setLoaded] = useState(false);

	const filteredImages = images.filter((img: _TImage) =>
		range(curIndex - 15, curIndex + 15).includes(img.index)
	);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (curIndex < images.length - 1) {
				changeCurrentIndex(curIndex + 1);
			}
		},
		onSwipedRight: () => {
			if (curIndex > 0) {
				changeCurrentIndex(curIndex - 1);
			}
		},
		trackMouse: true,
	});

	const curren_TImage = images[curIndex]!;

	return (
		<MotionConfig
			transition={{
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.2 },
			}}
		>
			<div
				className="relative z-10 flex aspect-[3/2] w-full max-w-7xl items-center"
				{...handlers}
			>
				{/* Main image */}
				<div className="w-full overflow-hidden">
					<div className="relative flex aspect-[3/2] items-center justify-center">
						<AnimatePresence initial={false} custom={direction}>
							<motion.div
								key={curIndex}
								custom={direction}
								variants={variants}
								initial="enter"
								animate="center"
								exit="exit"
								className="absolute inset-0"
							>
								<Image
									className="h-full w-full object-contain"
									src={curren_TImage.src}
									width={1920}
									height={1080}
									priority
									alt="main gallery image"
									onLoad={() => setLoaded(true)}
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Buttons + bottom nav bar */}
				<div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
					{/* Buttons */}
					{loaded && (
						<div className="relative aspect-[3/2] max-h-full w-full">
							{curIndex > 0 && (
								<button
									className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
									style={{ transform: "translate3d(0, 0, 0)" }}
									onClick={() => changeCurrentIndex(curIndex - 1)}
								>
									<ChevronLeftIcon className="h-6 w-6" />
								</button>
							)}
							{curIndex + 1 < images.length && (
								<button
									className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
									style={{ transform: "translate3d(0, 0, 0)" }}
									onClick={() => changeCurrentIndex(curIndex + 1)}
								>
									<ChevronRightIcon className="h-6 w-6" />
								</button>
							)}
							<div className="absolute left-0 top-0 flex items-center gap-2 p-3 text-white">
								{/* full size version */}
								<a
									href={curren_TImage.src}
									className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
									target="_blank"
									title="Open fullsize version"
									rel="noreferrer"
								>
									<ExternalLink className="h-5 w-5" />
								</a>
								{/* download */}
								<button
									onClick={() =>
										downloadImage(curren_TImage.src, `${curIndex}.jpg`)
									}
									className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
									title="Download fullsize version"
								>
									<Download className="h-5 w-5" />
								</button>
							</div>
							<div className="absolute right-0 top-0 flex items-center gap-2 p-3 text-white">
								<button
									onClick={() => closeModal()}
									className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
								>
									<XCircle className="h-5 w-5" />
								</button>
							</div>
						</div>
					)}
					{/* Bottom Nav bar */}
					<div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
						<motion.div
							initial={false}
							className="mx-auto mb-6 mt-6 flex aspect-[3/2] h-14"
						>
							<AnimatePresence initial={false}>
								{filteredImages.map(({ src, id }, i) => (
									<motion.button
										initial={{
											width: "0%",
											x: `${Math.max((curIndex - 1) * -100, 15 * -100)}%`,
										}}
										animate={{
											scale: i === curIndex ? 1.25 : 1,
											width: "100%",
											x: `${Math.max(curIndex * -100, 15 * -100)}%`,
										}}
										exit={{ width: "0%" }}
										onClick={() => changeCurrentIndex(i)}
										key={i}
										className={`${
											i === curIndex
												? "z-20 rounded-md shadow shadow-black/50"
												: "z-10"
										} ${i === 0 ? "rounded-l-md" : ""} ${
											i === images.length - 1 ? "rounded-r-md" : ""
										} relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
									>
										<Link
											href={{
												query: {
													imageId: id,
												},
											}}
											scroll={false}
										>
											<Image
												alt="small photos on the bottom"
												width={180}
												height={120}
												className={`${
													i === curIndex
														? "brightness-110 hover:brightness-110"
														: "brightness-50 contrast-125 hover:brightness-75"
												} h-full transform object-cover transition`}
												src={src}
											/>
										</Link>
									</motion.button>
								))}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</div>
		</MotionConfig>
	);
}
