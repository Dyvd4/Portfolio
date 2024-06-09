import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _BreadcrumbProps = {};

export type BreadcrumbProps = PropsWithChildren<_BreadcrumbProps> &
	Omit<ComponentPropsWithRef<"div">, keyof _BreadcrumbProps>;

function Breadcrumb({ className, ...props }: BreadcrumbProps) {
	return (
		<div className={`${className} flex`} aria-label="Breadcrumb" {...props}>
			<ol className="inline-flex items-center space-x-1 md:space-x-3">{props.children}</ol>
		</div>
	);
}

export default Breadcrumb;
