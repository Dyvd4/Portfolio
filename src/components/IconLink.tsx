import { cn } from "@utils/component-utils";
import Link, { LinkProps } from "next/link";
import { BsArrowRight } from "react-icons/bs";

type IconLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
	LinkProps & {
		children?: React.ReactNode;
		disabled?: boolean;
		/**
		 * @param normal
		 * text and icon is black in light mode and white in dark mode
		 * @param black
		 * text and icon is always black (also in dark mode)
		 */
		variant?: "normal" | "black" | "secondary";
		icon?: React.ReactElement;
	} & React.RefAttributes<HTMLAnchorElement>;

function IconLink({
	children,
	className,
	disabled,
	variant = "normal",
	icon,
	...props
}: IconLinkProps) {
	const variantLinkClassNames =
		variant === "normal"
			? "text-black dark:text-white"
			: variant === "secondary"
			? "text-secondary"
			: "text-black";

	const variantIconClassNames =
		variant === "normal"
			? "fill-black dark:fill-white"
			: variant === "secondary"
			? "fill-secondary"
			: "fill-black";

	return (
		<Link
			className={cn(
				`group flex items-center gap-2 hover:underline`,
				{
					"pointer-events-none": !!disabled,
				},
				variantLinkClassNames,
				className
			)}
			{...props}
		>
			{children}
			{!!icon && icon}
			{!icon && (
				<>
					<BsArrowRight
						className={`inline transition-transform 
										group-hover:translate-x-1 ${variantIconClassNames}`}
					/>
				</>
			)}
		</Link>
	);
}

export default IconLink;
