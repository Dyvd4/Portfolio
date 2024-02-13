import { PAGE_TITLE } from "@app/legal-disclosure";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

