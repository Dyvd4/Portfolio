import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "My projects",
	description: "Overview of my coding projects. Most of them should be available on GitHub.",
	keywords: ["Web app", "coding", "projects", "GitHub", "David Kimmich"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
