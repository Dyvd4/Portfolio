import { H1 } from "@components/H1";
import { cn } from "@utils/component-utils";
import { motion } from "framer-motion";
import type { ComponentPropsWithRef, PropsWithChildren } from "react";

type _LandingPageSectionProps = {
	heading: string;
	subheading?: string;
};

export type LandingPageSectionProps = _LandingPageSectionProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"section">>, keyof _LandingPageSectionProps>;

export function LandingPageSection({
	className,
	children,
	heading,
	subheading,
	...props
}: LandingPageSectionProps) {
	return (
		<section className={cn("pb-28 pt-20 lg:pb-44 lg:pt-32", className)} {...props}>
			<div className="mx-auto max-w-screen-lg">
				<motion.div
					initial={{ transform: "translateY(100%)", opacity: 0 }}
					whileInView={{ transform: "translateY(0%)", opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					viewport={{ once: true }}
					className="flex flex-col items-center justify-center gap-3 text-center"
				>
					{subheading && <div className="text-secondary">{subheading}</div>}
					<H1>{heading}</H1>
				</motion.div>
				{children}
			</div>
		</section>
	);
}
