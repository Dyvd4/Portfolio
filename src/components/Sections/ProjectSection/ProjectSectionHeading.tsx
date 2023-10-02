import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { cn } from "@utils/component-utils";

type _ProjectSectionHeadingProps = {};

export type ProjectSectionHeadingProps = _ProjectSectionHeadingProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"h1">>, keyof _ProjectSectionHeadingProps>;

function ProjectSectionHeading({ className, children, ...props }: ProjectSectionHeadingProps) {
	return (
		<h1
			className={cn(`whitespace-nowrap text-lg font-medium sm:text-xl`, className)}
			{...props}
		>
			{children}
		</h1>
	);
}

export default ProjectSectionHeading;
