import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef } from "react";

type _NavDoubleArrowDownProps = {};

export type NavDoubleArrowDownProps = _NavDoubleArrowDownProps &
	Omit<ComponentPropsWithRef<"svg">, keyof _NavDoubleArrowDownProps>;

function NavDoubleArrowDown({ className, children, ...props }: NavDoubleArrowDownProps) {
	return (
		<svg className={cn("icon", className)} viewBox="0 0 24 24" {...props}>
			<path
				d="M18 6L12 12L6 6"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M18 12L12 18L6 12"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default NavDoubleArrowDown;
