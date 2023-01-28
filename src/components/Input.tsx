import { ComponentPropsWithRef } from "react";

type InputProps = {} & ComponentPropsWithRef<"input">

/** @see https://flowbite.com/docs/forms/search-input/ */
function Input({ className, ...props }: InputProps) {
	return (
		<input
			className={`block w-full p-4
						text-sm text-gray-900
						border border-gray-300
						rounded-lg bg-gray-50 outline-none
						focus:ring-blue-500 focus:ring-2 focus:border-blue-500
						dark:bg-gray-700 dark:border-gray-600
						dark:placeholder-gray-400 dark:text-white
						dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
			{...props}
		/>
	);
}

export default Input;