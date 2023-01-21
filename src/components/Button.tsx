import { ComponentPropsWithRef, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{}> & ComponentPropsWithRef<"button">

export default function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            type={"button"}
            className={`bg-yellow-500 hover:bg-yellow-400
                        active:bg-yellow-300 
                        dark:bg-yellow-400 dark:hover:bg-yellow-300
                        dark:active:bg-yellow-200 text-black
                        py-2 px-4 text-md w-auto
                        cursor-pointer rounded-full 
                        outline-none border-none font-bold 
                        transform transition-transform active:scale-90
                        ${className}`}
            {...props}>
            {children}
        </button>
    );
}