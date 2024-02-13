import { PAGE_TITLE } from "@app/privacy-policy";
import { Metadata } from "next/types";
import { getOgImageUrl } from "@utils/utils";

const ogImageTitle = "privacy_policy"
const ogImage = { url: getOgImageUrl(ogImageTitle), alt: ogImageTitle }

export const metadata: Metadata = {
    title: PAGE_TITLE,
    openGraph: {
        images: ogImage
    },
    twitter: {
        images: ogImage
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

