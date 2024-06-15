import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef } from "react";

type _DownloadProps = {};

export type DownloadProps = _DownloadProps &
	Omit<ComponentPropsWithRef<"svg">, keyof _DownloadProps>;

function Download({ className, ...props }: DownloadProps) {
	return (
		<svg className={cn("icon", className)} viewBox="0 0 24 24" {...props}>
			<path
				d="M6 20H18"
				stroke="black"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5"
				stroke="black"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
}

export default Download;
