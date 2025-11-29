import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, forwardRef } from "react";

type InputProps = {
	hasError?: boolean;
} & ComponentPropsWithRef<"input">;

/** @see https://flowbite.com/docs/forms/search-input/ */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, hasError, ...props },
	ref
) {
	return (
		<input
			ref={ref}
			className={cn(
				`block w-full rounded-lg
						border border-gray-300 bg-gray-50 p-4
						text-sm outline-hidden focus:border-blue-500
						focus:ring-2 focus:ring-blue-500 dark:border-gray-600
						dark:bg-gray-700 dark:text-white
						dark:placeholder-gray-400
						dark:focus:border-blue-500 dark:focus:ring-blue-500`,
				{
					"text-red-500 placeholder:text-red-500": !!hasError,
				},
				className
			)}
			{...props}
		/>
	);
});

export default Input;
