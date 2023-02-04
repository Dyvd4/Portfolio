import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { DefaultColors } from "tailwindcss/types/generated/colors";

type Colors = Extract<keyof DefaultColors, "blue" | "gray" | "red" | "green" | "yellow" | "indigo" | "purple" | "pink">

type BadgeProps = PropsWithChildren<{
	variant?: Colors
}> & ComponentPropsWithRef<"span">

/** @see https://flowbite.com/docs/components/badge/ */
function Badge({ children, variant = "blue", className, ...props }: BadgeProps) {
	switch (variant) {
		case "blue":
			return <span className={`bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ${className}`} {...props}>
				{children}
			</span>
		case "gray":
			return <span className={`bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 ${className}`} {...props}>
				{children}
			</span>
		case "red":
			return <span className={`bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 ${className}`} {...props}>
				{children}
			</span>
		case "green":
			return <span className={`bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 ${className}`} {...props}>
				{children}
			</span>
		case "yellow":
			return <span className={`bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 ${className}`} {...props}>
				{children}
			</span>
		case "indigo":
			return <span className={`bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 ${className}`} {...props}>
				{children}
			</span>
		case "purple":
			return <span className={`bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 ${className}`} {...props}>
				{children}
			</span>
		case "pink":
			return <span className={`bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300 ${className}`} {...props}>
				{children}
			</span>
	}
}

export default Badge;