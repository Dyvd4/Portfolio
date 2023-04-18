import { ComponentPropsWithRef, PropsWithChildren } from "react";

type IconButtonProps = PropsWithChildren<{
	variant?: "circle" | "square"
}> & ComponentPropsWithRef<"div">

function IconButton({ variant = "square", className, children, ...props }: IconButtonProps) {
	return (
		<div
			className={`${variant === "circle" ? "rounded-full" : "rounded-lg"}
						p-2 cursor-pointer border
						border-black dark:border-white
						bg-white dark:bg-gray-900
						hover:bg-gray-100 dark:hover:bg-gray-800
						transition-all active:scale-90 ${className}`}
			{...props}>
			{children}
		</div>
	);
}

export default IconButton;