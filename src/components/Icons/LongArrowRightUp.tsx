import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef } from "react";

type _LongArrowRightUpProps = {};

export type LongArrowRightUpProps = _LongArrowRightUpProps &
	Omit<ComponentPropsWithRef<"svg">, keyof _LongArrowRightUpProps>;

function LongArrowRightUp({ className, children, ...props }: LongArrowRightUpProps) {
	return (
		<svg className={cn("icon", className)} viewBox="0 0 24 24" {...props}>
			<path
				d="M19 10.5L15.5 7 12 10.5"
				stroke="#000000"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.5 7v6a4 4 0 01-4 4h-7"
				stroke="#000000"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default LongArrowRightUp;
