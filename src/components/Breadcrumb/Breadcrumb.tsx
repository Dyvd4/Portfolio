import { ComponentPropsWithRef, PropsWithChildren } from 'react';

type _BreadcrumbProps = {}

export type BreadcrumbProps = PropsWithChildren<_BreadcrumbProps> &
	Omit<ComponentPropsWithRef<'nav'>, keyof _BreadcrumbProps>

function Breadcrumb({ className, ...props }: BreadcrumbProps) {
	return (
		<nav
			className={`${className} flex`}
			aria-label="Breadcrumb"
			{...props}>
			<ol className="inline-flex items-center space-x-1 md:space-x-3">
				{props.children}
			</ol>
		</nav>
	);
}

export default Breadcrumb;