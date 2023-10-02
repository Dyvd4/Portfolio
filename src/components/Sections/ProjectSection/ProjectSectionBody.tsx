import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { cn } from "@utils/component-utils";

type _ProjectSectionBodyProps = {};

export type ProjectSectionBodyProps = _ProjectSectionBodyProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"p">>, keyof _ProjectSectionBodyProps>;

function ProjectSectionBody({ className, children, ...props }: ProjectSectionBodyProps) {
	return (
		<p className={cn(`text-secondary`, className)} {...props}>
			{children}
		</p>
	);
}

export default ProjectSectionBody;
