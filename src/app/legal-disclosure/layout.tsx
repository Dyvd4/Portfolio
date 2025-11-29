import { PAGE_TITLE } from "@app/legal-disclosure";
import { Metadata } from "next/types";
import OgImage from "@public/og/legal-disclosure.png";

export const metadata: Metadata = {
	title: PAGE_TITLE,
	openGraph: {
		images: [
			{
				url: OgImage.src,
				alt: "legal disclosure",
			},
		],
	},
	twitter: {
		images: [
			{
				url: OgImage.src,
				alt: "legal disclosure",
			},
		],
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto max-w-(--breakpoint-lg) px-6">{children}</div>;
}
