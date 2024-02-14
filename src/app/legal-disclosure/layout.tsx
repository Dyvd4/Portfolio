import { PAGE_TITLE } from "@app/legal-disclosure";
import { getOgImageUrl } from "@utils/utils";
import { Metadata } from "next/types";

const ogImageTitle = "legal_disclosure";
const ogImage = { url: getOgImageUrl(ogImageTitle), alt: ogImageTitle };

export const metadata: Metadata = {
	title: PAGE_TITLE,
	openGraph: {
		images: ogImage,
	},
	twitter: {
		images: ogImage,
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
