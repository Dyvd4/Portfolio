import { Metadata } from "next/types";
import OgImage from "@public/og/about-me-page.png"

export const metadata: Metadata = {
	title: "About me",
	description: "Here is an overview about me, my experiences and what technologies I use.",
	keywords: [
		"About me",
		"Experiences",
		"Skills",
		"Technologies",
		"Contact",
		"Programming",
		"languages",
		"David Kimmich",
	],
	openGraph: {
		images: [{
			url: OgImage.src,
			alt: "About me"
		}]
	},
	twitter: {
		images: [{
			url: OgImage.src,
			alt: "About me"
		}]
	}
};

export default async function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
