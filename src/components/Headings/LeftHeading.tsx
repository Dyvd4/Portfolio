import { H1 } from "@components/H1";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _LeftHeadingProps = {
	rightSection: React.ReactNode;
};

export type LeftHeadingProps = _LeftHeadingProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _LeftHeadingProps>;

function LeftHeading({ className, children, rightSection, ...props }: LeftHeadingProps) {
	return (
		<div
			className={cn(`flex flex-col justify-between gap-4 sm:flex-row sm:gap-0`, className)}
			{...props}
		>
			<H1 className="text-5xl sm:text-7xl">{children}</H1>
			<div className="flex flex-col items-start sm:items-end sm:justify-end">
				{rightSection}
			</div>
		</div>
	);
}

export default LeftHeading;
