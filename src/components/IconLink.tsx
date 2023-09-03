import Link, { LinkProps } from "next/link";
import { BsArrowRight } from "react-icons/bs";
import LongArrowRightUp from "./Icons/LongArrowRightUp";

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
		variant?: "normal" | "black";
		useArrowUp?: boolean;
	} & React.RefAttributes<HTMLAnchorElement>;

function IconLink({
	children,
	className,
	disabled,
	variant = "normal",
	useArrowUp,
	...props
}: IconLinkProps) {
	const variantLinkClassNames =
		variant === "normal" ? "text-black dark:text-white" : "text-black";

	const variantIconClassNames =
		variant === "normal" ? "fill-black dark:fill-white" : "fill-black";

	return (
		<Link
			className={`group flex items-center gap-2 hover:underline ${variantLinkClassNames}
						${disabled ? "pointer-events-none" : ""}
						${className}`}
			{...props}
		>
			{children}
			{!!useArrowUp && (
				<>
					<LongArrowRightUp
						className={`inline shrink-0 transition-transform
										group-hover:translate-x-1 ${variantIconClassNames}`}
					/>
				</>
			)}
			{!useArrowUp && (
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
