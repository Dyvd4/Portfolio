import "@/styles/globals.css";
import Footer from "@components/Footer";
import ModalPortal from "@components/ModalPortal";
import Navbar from "@components/Navbar/Navbar";
import LoadingPortalSlot from "@components/Slots/LoadingPortalSlot";
import config from "@config/config";
import useDarkModeIsActive from "@hooks/server/useDarkModeIsActive";
import OgImage from "@public/og/landing-page.png";
import { getServerSession } from "next-auth";
import { Geologica } from "next/font/google";
import { Metadata } from "next/types";
import { Toaster } from "react-hot-toast";
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
	const darkModeIsActive = useDarkModeIsActive();
	const session = await getServerSession();
	return (
		<html lang="en" className={darkModeIsActive ? "dark" : ""}>
			<body className={`${font.className} bg-white transition-colors dark:bg-gray-900 `}>
				<Providers session={session}>
					<div className="min-h-screen">
						<Navbar darkModeIsActive={darkModeIsActive} />
						<main className="mx-auto max-w-screen-md px-8 pt-2">
							<Breadcrumbs />
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
