"use client";
import Breadcrumb, { BreadcrumbItem } from "@components/Breadcrumb";
import breadcrumbAtom from "@context/atoms/BreadcrumbAtom";
import { useAtom } from "jotai";

export default function Breadcrumbs() {
	const [breadcrumb] = useAtom(breadcrumbAtom);
	return (
		<Breadcrumb className="pb-8">
			{breadcrumb.items.map((item, i) => (
				<BreadcrumbItem {...item} key={i} />
			))}
		</Breadcrumb>
	);
}
