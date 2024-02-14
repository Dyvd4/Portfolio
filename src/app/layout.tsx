import "@/styles/globals.css";
import Footer from "@components/Footer";
import ModalPortal from "@components/ModalPortal";
import Navbar from "@components/Navbar/Navbar";
import LoadingPortalSlot from "@components/Slots/LoadingPortalSlot";
import useDarkModeIsActive from "@hooks/server/useDarkModeIsActive";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "./breadcrumbs";
import Providers from "./providers";
import config from "@config/config";

const { BASE_URL } = config;
const interFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: "Intuitive. Useful. Beautiful.",
	description:
		"These are the properties a web app should have. I am David Kimmich, a web dev from Germany. If you want to know more about me, have a look here on this site and feel free to contact me!",
	keywords: ["Intuitive", "Useful", "Beautiful", "Portfolio", "Web app", "David Kimmich"],
	authors: [{ name: "David Kimmich" }],
	icons: {
		shortcut: "/Logo.png",
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const darkModeIsActive = useDarkModeIsActive();
	const session = await getServerSession();
	return (
		<html lang="en" className={darkModeIsActive ? "dark" : ""}>
			<body className={`${interFont.className} bg-white transition-colors dark:bg-gray-900 `}>
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
