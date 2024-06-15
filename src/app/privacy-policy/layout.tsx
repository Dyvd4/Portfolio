import { PAGE_TITLE } from "@app/privacy-policy";
import { Metadata } from "next/types";
import OgImage from "@public/og/privacy-policy.png";

export const metadata: Metadata = {
	title: PAGE_TITLE,
	openGraph: {
		images: [
			{
				url: OgImage.src,
				alt: "privacy policy",
			},
		],
	},
	twitter: {
		images: [
			{
				url: OgImage.src,
				alt: "privacy policy",
			},
		],
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto max-w-screen-lg px-6">{children}</div>;
}
