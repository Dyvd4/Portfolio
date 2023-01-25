import { ComponentPropsWithRef, PropsWithChildren } from "react";

type TooltipWrapperProps = PropsWithChildren & ComponentPropsWithRef<"div">

function TooltipWrapper({ children, className, ...props }: TooltipWrapperProps) {
	return (
		<div className={`p-2 bg-gray-50 dark:bg-gray-900
						rounded-md text-sm
						text-start ${className}`}
			{...props}>
			{children}
		</div>
	)
}

export default TooltipWrapper;