import "@/styles/globals.css";
import Footer from "@components/Footer";
import ModalPortal from "@components/ModalPortal";
import Navbar from "@components/Navbar_APP";
import LoadingPortalSlot from "@components/Slots/LoadingPortalSlot";
import { Inter } from "next/font/google";
import { darkModeCookieName } from "@utils/DarkModeUtils";
import { cookies } from "next/headers";
import { Metadata } from "next/types";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "./breadcrumbs";
import Providers from "./providers";
import { getServerSession } from "next-auth";

const robotoFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
	const isDarkMode = Boolean(parseInt(cookies().get(darkModeCookieName)?.value || "0"));
	const session = await getServerSession();
	return (
		<html lang="en" className={isDarkMode ? "dark" : ""}>
			<body
				className={`${robotoFont.className} bg-white transition-colors dark:bg-gray-900 `}
			>
				<Providers session={session}>
					<div className="min-h-screen">
						<Navbar />
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
