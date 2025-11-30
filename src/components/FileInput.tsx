import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, forwardRef, PropsWithChildren } from "react";

type _FileInputProps = {
	hasError?: boolean;
};

export type FileInputProps = _FileInputProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"input">>, keyof _FileInputProps>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
	{ className, children, hasError, ...props }: FileInputProps,
	ref
) {
	return (
		<input
			ref={ref}
			className={cn(`block w-full cursor-pointer rounded-lg border border-gray-300
                         bg-gray-50 text-sm text-gray-900 focus:outline-hidden dark:border-gray-600
                          dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400`)}
			type="file"
			{...props}
		/>
	);
});

export default FileInput;
