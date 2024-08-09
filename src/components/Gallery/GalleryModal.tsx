"use client";
import GalleryModalContent from "@components/Gallery/GalleryModalContent";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import { motion } from "framer-motion";
import { type _TImage } from "./Gallery";

type GalleryModalProps = {
	images: _TImage[];
	isOpen: boolean;
	curIndex: number;
	direction: number;
	onOpenChange(): void;
	changeCurrentIndex(idx: number): void;
};

export function GalleryModal({
	images,
	isOpen,
	curIndex,
	direction,
	changeCurrentIndex,
	onOpenChange,
}: GalleryModalProps) {
	return (
		<Dialog
			open={isOpen}
			onClose={onOpenChange}
			className="fixed inset-0 z-10 flex items-center justify-center"
		>
			<DialogBackdrop
				className="fixed inset-0 bg-black/70 backdrop-blur-2xl"
				as={motion.div}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			/>
			<GalleryModalContent
				curIndex={curIndex}
				direction={direction}
				images={images}
				changeCurrentIndex={changeCurrentIndex}
				closeModal={onOpenChange}
				navigation={true}
			/>
		</Dialog>
	);
}
