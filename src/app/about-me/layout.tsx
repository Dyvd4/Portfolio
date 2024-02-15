import { Metadata } from "next/types";

const GH_REPO_OWNER = process.env.GH_REPO_OWNER!;

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

export default async function Layout({ children }: { children: React.ReactNode }) {

	console.log(GH_REPO_OWNER)
	return children;
}
