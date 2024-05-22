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
				`cursor-pointer border border-black p-2
						transition-all 
						active:scale-90 dark:border-white`,
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
