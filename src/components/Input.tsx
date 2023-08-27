import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, forwardRef } from "react";

type InputProps = {
	hasError?: boolean;
} & ComponentPropsWithRef<"input">

/** @see https://flowbite.com/docs/forms/search-input/ */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, hasError, ...props }, ref) {
	return (
		<input
			ref={ref}
			className={cn(`block w-full p-4
						text-sm border border-gray-300 dark:text-white
						rounded-lg bg-gray-50 outline-none
						focus:ring-blue-500 focus:ring-2 focus:border-blue-500
						dark:bg-gray-700 dark:border-gray-600
						dark:placeholder-gray-400
						dark:focus:ring-blue-500 dark:focus:border-blue-500`,
				{
					"text-red-500 placeholder:text-red-500": !!hasError,
				},
				className)}
			{...props}
		/>
	);
})

export default Input;