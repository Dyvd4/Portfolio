import { Metadata } from "next/types";

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
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
