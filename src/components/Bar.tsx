"use client";

import { cn } from "@utils/component-utils";
import { motion } from "motion/react";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _BarProps = {
	widthInPercent: number;
};

export type BarProps = _BarProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _BarProps>;

function Bar({ className, children, widthInPercent, ...props }: BarProps) {
	return (
		<div
			className={cn(`relative h-6 w-full rounded-full bg-neutral-300`, className)}
			{...props}
		>
			<motion.div
				className="absolute h-full rounded-full bg-yellow-400"
				initial={{ width: 0 }}
				whileInView={{ width: `${widthInPercent}%` }}
				transition={{ duration: 1, ease: "easeOut" }}
			></motion.div>
		</div>
	);
}

export default Bar;
