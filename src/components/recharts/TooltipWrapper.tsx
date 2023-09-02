import { ComponentPropsWithRef, PropsWithChildren } from "react";

type TooltipWrapperProps = PropsWithChildren & ComponentPropsWithRef<"div">;

function TooltipWrapper({ children, className, ...props }: TooltipWrapperProps) {
	return (
		<div
			className={`rounded-md border border-black
						bg-white p-2
						text-start text-sm dark:border-white
						dark:bg-gray-900 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}

export default TooltipWrapper;
