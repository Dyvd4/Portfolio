import { ComponentPropsWithRef, PropsWithChildren } from "react";

type TooltipWrapperProps = PropsWithChildren & ComponentPropsWithRef<"div">

function TooltipWrapper({ children, className, ...props }: TooltipWrapperProps) {
    return (
        <div className={`bg-white text-black p-2 
                            rounded-md text-sm
                            text-start ${className}`}
            {...props}>
            {children}
        </div>
    )
}

export default TooltipWrapper;