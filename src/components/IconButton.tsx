import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type IconButtonProps = PropsWithChildren<{
	variant?: "circle" | "square"
}> & ComponentPropsWithRef<"div">

function IconButton({ variant = "square", className, children, ...props }: IconButtonProps) {
	return (
		<div
			className={cn(`p-2 cursor-pointer border
						border-black dark:border-white
						bg-white dark:bg-gray-900
						hover:bg-gray-50 dark:hover:bg-gray-800
						transition-all active:scale-90`,
				{
					"rounded-full": variant === "circle",
					"rounded-lg": variant !== "circle"
				},
				className)}
			{...props}>
			{children}
		</div>
	);
}

export default IconButton;