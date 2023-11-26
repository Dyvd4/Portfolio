import { cn } from "@utils/component-utils";
import Link from "next/link";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _NavLinkProps = {
	href: string;
	isActive?: boolean;
};

export type NavLinkProps = _NavLinkProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"a">>, keyof _NavLinkProps>;

function NavLink({ className, children, isActive, ...props }: NavLinkProps) {
	return (
		<Link
			className={cn(
				`transition-colors hover:text-yellow-500 
                            dark:text-white dark:hover:text-yellow-500`,
				{
					"text-yellow-500 dark:text-yellow-500": !!isActive,
				},
				className
			)}
			{...props}
		>
			{children}
		</Link>
	);
}

export default NavLink;
