import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef } from "react";

type _HalfMoonProps = {};

export type HalfMoonProps = _HalfMoonProps &
	Omit<ComponentPropsWithRef<"svg">, keyof _HalfMoonProps>;

function HalfMoon({ className, children, ...props }: HalfMoonProps) {
	return (
		<svg className={cn("icon", className)} viewBox="0 0 24 24" {...props}>
			<path d="M3 11.507a9.493 9.493 0 0018 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.494 9.494 0 003 11.507z" />
		</svg>
	);
}

export default HalfMoon;
