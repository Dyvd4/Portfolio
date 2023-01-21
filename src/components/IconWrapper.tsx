import { ComponentPropsWithRef, PropsWithChildren } from "react";

type IconProps = PropsWithChildren<{}> & ComponentPropsWithRef<"span">

function Icon({ className, children, ...props }: IconProps) {
    return (
        <span
            className={`text-black dark:text-white ${className}`}
            {...props}>
            {children}
        </span>
    );
}

export default Icon;