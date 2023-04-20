import { useAtom } from "jotai";
import { useEffect } from "react";
import BreadcrumbAtom, { BreadcrumbItem } from "../atoms/BreadcrumbAtom";

export default function useBreadcrumb(items: BreadcrumbItem[]) {
	const [, setBreadcrumb] = useAtom(BreadcrumbAtom)

	useEffect(() => {
		setBreadcrumb({
			items
		});
	}, []);
}