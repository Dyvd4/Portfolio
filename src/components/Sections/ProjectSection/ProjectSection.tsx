import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { cn } from "@utils/component-utils";

type _ProjectSectionProps = {};

export type ProjectSectionProps = _ProjectSectionProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"section">>, keyof _ProjectSectionProps>;

function ProjectSection({ className, children, ...props }: ProjectSectionProps) {
	return (
		<section className={cn(`flex flex-col gap-3`, className)} {...props}>
			{children}
		</section>
	);
}

export default ProjectSection;
