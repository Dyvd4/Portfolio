import { ComponentPropsWithRef, PropsWithChildren } from "react";

type TextProps = PropsWithChildren<{
    variant?: "normal" | "secondary"
}> & ComponentPropsWithRef<"div">

function Text({ children, className, variant = "normal", ...props }: TextProps) {

    const colorClassName = variant === "secondary"
        ? "text-gray-700 dark:text-gray-300"
        : "text-black dark:text-white";

    return (
        <div
            className={`${colorClassName} ${className}`}
            {...props}>
            {children}
        </div>
    );
}

export default Text;