import { cn } from "@utils/component-utils";
import Image, { ImageProps } from "next/image";
import { ComponentPropsWithRef } from "react";

type _ExperienceCardProps = {
	imageProps: Omit<ImageProps, "width" | "height">;
	title: string;
};

export type ExperienceCardProps = _ExperienceCardProps &
	Omit<ComponentPropsWithRef<"div">, keyof _ExperienceCardProps>;

function ExperienceCard({ className, title, imageProps, ...props }: ExperienceCardProps) {
	return (
		<div className={cn("flex w-fit flex-col items-center gap-3", className)}>
			<div
				className={`flex items-center justify-center gap-6 rounded-xl bg-gray-100 p-5`}
				{...props}
			>
				{/* eslint-disable-next-line jsx-a11y/alt-text */}
				<Image
					unoptimized
					className="aspect-square"
					width={64}
					height={64}
					{...imageProps}
				/>
			</div>
			<div className="text-sm leading-4">{title}</div>
		</div>
	);
}

export default ExperienceCard;
