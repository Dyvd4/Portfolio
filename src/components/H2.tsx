import { cn } from "@utils/component-utils";
import { PropsWithChildren, ComponentPropsWithRef } from "react";

type _H2Props = object;

export type H2Props = _H2Props &
	Omit<PropsWithChildren<ComponentPropsWithRef<"h2">>, keyof _H2Props>;

export function H2({ className, children, ...props }: H2Props) {
	return (
		<h2 className={cn("text-lg font-bold", className)} {...props}>
			{children}
		</h2>
	);
}
