import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef } from "react";

type _DataTransferBothProps = {};

export type DataTransferBothProps = _DataTransferBothProps &
	Omit<ComponentPropsWithRef<"svg">, keyof _DataTransferBothProps>;

function DataTransferBoth({ className, ...props }: DataTransferBothProps) {
	return (
		<svg className={cn("icon", className)} viewBox="0 0 24 24" {...props}>
			<path
				d="M17 20V4M17 4L20 7M17 4L14 7"
				stroke="black"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7 4V20M7 20L10 17M7 20L4 17"
				stroke="black"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default DataTransferBoth;
