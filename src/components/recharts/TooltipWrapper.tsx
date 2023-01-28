import { ComponentPropsWithRef, PropsWithChildren } from "react";

type TooltipWrapperProps = PropsWithChildren & ComponentPropsWithRef<"div">

function TooltipWrapper({ children, className, ...props }: TooltipWrapperProps) {
	return (
		<div className={`p-2 bg-white dark:bg-gray-900
						border-black dark:border-white
						rounded-md text-sm border
						text-start ${className}`}
			{...props}>
			{children}
		</div>
	)
}

export default TooltipWrapper;