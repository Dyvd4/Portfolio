import { Metadata } from "next/types";
import OgImage from "@public/og/projects-page.png";

export const metadata: Metadata = {
	title: "My projects",
	description: "Overview of my coding projects. Most of them should be available on GitHub.",
	keywords: ["Web app", "coding", "projects", "GitHub", "David Kimmich"],
	openGraph: {
		images: [
			{
				url: OgImage.src,
				alt: "projects",
			},
		],
	},
	twitter: {
		images: [
			{
				url: OgImage.src,
				alt: "projects",
			},
		],
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto max-w-(--breakpoint-lg) px-6">{children}</div>;
}
