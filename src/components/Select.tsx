import { ComponentPropsWithRef, forwardRef, PropsWithChildren } from "react";
import { cn } from "@utils/component-utils";

type _SelectProps = {
	hasError?: boolean;
};

export type SelectProps = _SelectProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"select">>, keyof _SelectProps>;

/** @see https://flowbite.com/docs/forms/select */
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
	{ className, hasError, children, ...props }: SelectProps,
	ref
) {
	return (
		<select
			ref={ref}
			className={cn(
				`block w-full rounded-lg border border-gray-300 
             bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500
             focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 
             dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 
             dark:focus:ring-blue-500`,
				{
					"text-red-500 placeholder:text-red-500": !!hasError,
				},
				className
			)}
			{...props}
		>
			{children}
		</select>
	);
});

export default Select;
