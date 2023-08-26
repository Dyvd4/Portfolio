import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{}> & ComponentPropsWithRef<"button">

export default function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			type={"button"}
			className={cn(`bg-yellow-500 hover:bg-yellow-400
						dark:bg-yellow-400 dark:hover:bg-yellow-300
						active:bg-yellow-300 
						dark:active:bg-yellow-200 text-black
						py-2 px-4 w-auto
						text-xs sm:text-base
						cursor-pointer rounded-full 
						outline-none border-none font-bold 
						transform transition-transform active:scale-90
						disabled:bg-yellow-200 disabled:hover:bg-yellow-200
						disabled:dark:bg-yellow-200 disabled:dark:hover:bg-yellow-200
						disabled:hover:cursor-not-allowed disabled:transform-none
						`,
				className)}
			{...props}>
			{children}
		</button>
	);
}