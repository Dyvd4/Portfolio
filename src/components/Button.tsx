import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{}> & ComponentPropsWithRef<"button">;

export default function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			type={"button"}
			className={cn(
				`w-auto transform
						cursor-pointer rounded-full
						border-none 
						bg-yellow-500 px-4
						py-2 text-xs font-bold
						text-black outline-none
						transition-transform hover:bg-yellow-400 
						active:scale-90 active:bg-yellow-300 disabled:transform-none 
						disabled:bg-yellow-200 disabled:hover:cursor-not-allowed disabled:hover:bg-yellow-200
						dark:bg-yellow-400 dark:hover:bg-yellow-300
						dark:active:bg-yellow-200 disabled:dark:bg-yellow-200
						disabled:dark:hover:bg-yellow-200 sm:text-base
						`,
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
