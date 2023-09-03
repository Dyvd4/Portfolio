import { cn } from "@utils/component-utils";
import Image, { ImageProps } from "next/image";
import fallbackProjectImage from "../../../public/Project_fallback.png";

type _ProjectImageProps = {
	src: string | null;
};

export type ProjectImageProps = _ProjectImageProps &
	Omit<ImageProps, keyof _ProjectImageProps | "alt">;

function ProjectImage({ className, children, src, ...props }: ProjectImageProps) {
	return (
		<Image
			className={cn(`rounded-xl`, className)}
			src={src || fallbackProjectImage}
			width={356}
			height={200}
			alt="project image"
			{...props}
		/>
	);
}

export default ProjectImage;
