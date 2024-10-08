import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef } from "react";

type _FireFlameProps = {};

export type FireFlameProps = _FireFlameProps &
	Omit<ComponentPropsWithRef<"svg">, keyof _FireFlameProps>;

function FireFlame({ className, ...props }: FireFlameProps) {
	return (
		<svg className={cn("icon", className)} viewBox="0 0 24 24" {...props}>
			<path
				d="M8 18C8 20.4148 9.79086 21 12 21C15.7587 21 17 18.5 14.5 13.5C11 18 10.5 11 11 9C9.5 12 8 14.8177 8 18Z"
				stroke="black"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 21C17.0495 21 20 18.0956 20 13.125C20 8.15444 12 3 12 3C12 3 4 8.15444 4 13.125C4 18.0956 6.95054 21 12 21Z"
				stroke="black"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default FireFlame;
