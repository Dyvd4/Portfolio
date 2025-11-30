import "@/styles/globals.css";
import Footer from "@components/Footer";
import ModalPortal from "@components/ModalPortal";
import Navbar from "@components/Navbar/Navbar";
import LoadingPortalSlot from "@components/Slots/LoadingPortalSlot";
import config from "@config/config";
import OgImage from "@public/og/landing-page.png";
import { Geologica } from "next/font/google";
import { Metadata } from "next/types";
import { Toaster } from "react-hot-toast";
import { auth } from "../auth";
import { getDarkModeIsActive } from "../backend/utils/dark-mode-utils";
import Breadcrumbs from "./breadcrumbs";
import Providers from "./providers";

const { BASE_URL } = config;
const font = Geologica({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: "Dave The Developer - Full-Stack Web Development",
	description:
		"Crafting Seamless Individual Web Experiences: Dave The Developer - Full-Stack Web Developer",
	keywords: [
		"Full Stack Web Development",
		"Dave The Developer",
		"Intuitive",
		"Useful",
		"Beautiful",
		"Portfolio",
		"Web Applications",
		"David Kimmich",
	],
	authors: [{ name: "David Kimmich" }],
	icons: {
		shortcut: "/Logo.png",
	},
	openGraph: {
		images: [
			{
				url: OgImage.src,
				alt: "Portfolio",
			},
		],
	},
	twitter: {
		images: [
			{
				url: OgImage.src,
				alt: "Portfolio",
			},
		],
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const darkModeIsActive = await getDarkModeIsActive();
	const session = await auth();
	return (
		<html lang="en" className={darkModeIsActive ? "dark" : ""}>
			<body className={`${font.className} bg-white transition-colors dark:bg-gray-900`}>
				<Providers session={session}>
					<div className="min-h-screen">
						<Navbar darkModeIsActive={darkModeIsActive} />
						<main className="mx-auto pt-2">
							<Breadcrumbs className="mx-auto max-w-(--breakpoint-lg) px-6" />
							{children}
						</main>
						<LoadingPortalSlot />
					</div>
					<Toaster position="bottom-center" />
					<ModalPortal />
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
