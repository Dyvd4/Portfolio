import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type IconButtonProps = PropsWithChildren<{
	variant?: "circle" | "square";
}> &
	ComponentPropsWithRef<"div">;

function IconButton({ variant = "square", className, children, ...props }: IconButtonProps) {
	return (
		<div
			className={cn(
				`cursor-pointer border border-black
						bg-white p-2
						transition-all hover:bg-gray-50
						active:scale-90 dark:border-white
						dark:bg-gray-900 dark:hover:bg-gray-800`,
				{
					"rounded-full": variant === "circle",
					"rounded-lg": variant !== "circle",
				},
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export default IconButton;
