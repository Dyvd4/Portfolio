"use client";
import Breadcrumb, { BreadcrumbItem } from "@components/Breadcrumb";
import breadcrumbAtom from "@context/atoms/BreadcrumbAtom";
import { cn } from "@utils/component-utils";
import { useAtom } from "jotai";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _BreadCrumbsProps = object;

export type BreadCrumbsProps = _BreadCrumbsProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _BreadCrumbsProps>;

export default function Breadcrumbs({ className, ...props }: BreadCrumbsProps) {
	const [breadcrumb] = useAtom(breadcrumbAtom);
	if (breadcrumb.items.length === 0) return null;
	return (
		<Breadcrumb className={cn("pb-8", className)} {...props}>
			{breadcrumb.items.map((item, i) => (
				<BreadcrumbItem {...item} key={i} />
			))}
		</Breadcrumb>
	);
}
