import { cn } from "@utils/component-utils";
import Image, { ImageProps } from "next/image";

type _ProjectImageProps = {
	src: string;
};

export type ProjectImageProps = _ProjectImageProps &
	Omit<ImageProps, keyof _ProjectImageProps | "alt">;

function ProjectImage({ className, children, src, ...props }: ProjectImageProps) {
	return (
		<Image
			className={cn(
				`aspect-video rounded-xl border drop-shadow-2xl dark:border-none`,
				className
			)}
			src={src}
			width={350}
			height={200}
			alt="project image"
			{...props}
		/>
	);
}

export default ProjectImage;
