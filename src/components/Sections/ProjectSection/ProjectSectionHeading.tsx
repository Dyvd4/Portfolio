import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { cn } from "@utils/component-utils";
import { H2 } from "@components/H2";

type _ProjectSectionHeadingProps = {};

export type ProjectSectionHeadingProps = _ProjectSectionHeadingProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"h1">>, keyof _ProjectSectionHeadingProps>;

function ProjectSectionHeading({ className, children, ...props }: ProjectSectionHeadingProps) {
	return (
		<H2
			className={cn(`whitespace-nowrap`, className)}
			{...props}
		>
			{children}
		</H2>
	);
}

export default ProjectSectionHeading;
