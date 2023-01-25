import Link, { LinkProps } from "next/link";
import { BsArrowRight } from "react-icons/bs";

type IconLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
	children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>

function IconLink({ children, className, ...props }: IconLinkProps) {
	return (
		<Link
			className={`group hover:underline text-black
						flex items-center ${className}`}
			{...props}>
			{children}&nbsp;
			<BsArrowRight className="inline transition-transform group-hover:translate-x-1 fill-black" />
		</Link>
	);
}

export default IconLink;