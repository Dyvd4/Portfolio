import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { DefaultColors } from "tailwindcss/types/generated/colors";

type Colors = Extract<
	keyof DefaultColors,
	"blue" | "gray" | "red" | "green" | "yellow" | "indigo" | "purple" | "pink"
>;

type BadgeProps = PropsWithChildren<{
	variant?: Colors;
}> &
	ComponentPropsWithRef<"span">;

/** @see https://flowbite.com/docs/components/badge/ */
function Badge({ children, variant = "blue", className, ...props }: BadgeProps) {
	switch (variant) {
		case "blue":
			return (
				<span
					className={cn(
						`rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
		case "gray":
			return (
				<span
					className={cn(
						`rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
		case "red":
			return (
				<span
					className={cn(
						`rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
		case "green":
			return (
				<span
					className={cn(
						`rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
		case "yellow":
			return (
				<span
					className={cn(
						`rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
		case "indigo":
			return (
				<span
					className={cn(
						`rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
		case "purple":
			return (
				<span
					className={cn(
						`rounded bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
		case "pink":
			return (
				<span
					className={cn(
						`rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300`,
						className
					)}
					{...props}
				>
					{children}
				</span>
			);
	}
}

export default Badge;
