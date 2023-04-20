import { _BreadcrumbItemProps } from "@components/Breadcrumb/BreadcrumbItem";
import { atom } from "jotai";

export type Breadcrumb = {
	items: BreadcrumbItem[]
}

export type BreadcrumbItem = _BreadcrumbItemProps

const breadcrumbAtom = atom({
	items: [] as BreadcrumbItem[]
} as Breadcrumb);

export default breadcrumbAtom;