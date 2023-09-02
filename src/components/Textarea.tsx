import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, forwardRef } from "react";

type TextareaProps = {
	hasError?: boolean;
} & ComponentPropsWithRef<"textarea">;

/** @see https://flowbite.com/docs/forms/textarea/ */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
	{ className, hasError, ...props },
	ref
) {
	return (
		<textarea
			ref={ref}
			className={cn(
				`block w-full rounded-lg border border-gray-300
					 	bg-gray-50 p-2.5 text-sm text-gray-900 
					 	focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 
						dark:bg-gray-700 dark:text-white
					 	dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`,
				{
					"text-red-500 placeholder:text-red-500": !!hasError,
				},
				className
			)}
			{...props}
		></textarea>
	);
});

export default Textarea;
