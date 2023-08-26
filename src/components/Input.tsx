import { ComponentPropsWithRef, forwardRef } from "react";

type InputProps = {} & ComponentPropsWithRef<"input">

/** @see https://flowbite.com/docs/forms/search-input/ */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
	return (
		<input
			ref={ref}
			className={`block w-full p-4
						text-sm border border-gray-300
						rounded-lg bg-gray-50 outline-none
						focus:ring-blue-500 focus:ring-2 focus:border-blue-500
						dark:bg-gray-700 dark:border-gray-600
						dark:placeholder-gray-400
						dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
			{...props}
		/>
	);
})

export default Input;