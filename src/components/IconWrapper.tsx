import { ComponentPropsWithRef, PropsWithChildren } from 'react';

type IconWrapperProps = PropsWithChildren<{
	variant?: "circle" | "square"
}> & ComponentPropsWithRef<"div">

function IconWrapper({ variant = "square", className, children, ...props }: IconWrapperProps) {

	return (
		<div
			className={`${variant === "circle" ? "rounded-full" : "rounded-lg"}
						p-2 cursor-pointer border
						border-black text-black dark:border-white dark:text-white
						hover:bg-gray-100 dark:hover:bg-gray-800
						transition-all active:scale-90
						${className}`}
			{...props}>
			{children}
		</div>
	)
}

export default IconWrapper;