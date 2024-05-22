"use client";
import Copyable from "@components/Copyable";
import { H1 } from "@components/H1";
import IconButton from "@components/IconButton";
import Tooltip from "@components/Tooltip";
import config from "@config/config";
import useDarkModeIsActive from "@hooks/useDarkModeIsActive";
import { toggleDarkMode } from "@utils/dark-mode-utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GitHub, HalfMoon, LinkedIn, Mail, SunLight } from "../Icons";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";

const {
	NEXT_PUBLIC_GITHUB_PROFILE_URL,
	NEXT_PUBLIC_LINKEDIN_PROFILE_URL,
	NEXT_PUBLIC_CONTACT_RECIPIENT,
} = config;

type NavbarProps = {
	darkModeIsActive: boolean;
};

const LINKS: Array<{ href: string; title: string }> = [
	{
		href: "/project",
		title: "Projects",
	},
	{
		href: "/about-me",
		title: "About me",
	},
];

function Navbar({ darkModeIsActive: initialDarkModeIsActive }: NavbarProps) {
	const pathname = usePathname();
	const darkModeIsActive = useDarkModeIsActive(initialDarkModeIsActive);
	const [navHeaderIsHidden, setNavHeaderIsHidden] = useState(false);

	useEffect(() => {
		const threshold = 50;
		window.addEventListener("scroll", (e) => {
			setNavHeaderIsHidden(window.scrollY > threshold);
		});
	}, []);

	return (
		<motion.nav
			initial={{
				transform: "translateY(0%)",
			}}
			animate={{ transform: navHeaderIsHidden ? "translateY(-64px)" : "translateY(0px)" }}
			transition={{ duration: 0.25, delay: 0.25 }}
			className="sticky top-0 z-50"
		>
			<ul className="sticky z-40 flex items-center justify-between bg-[#fef5db] px-6 py-3 dark:bg-white">
				<li className="flex items-center gap-2">
					<Mail
						className="[&.icon:hover>path]:stroke-black
									dark:[&.icon:hover>path]:stroke-black
										[&.icon>path]:!stroke-black"
					/>
					<Copyable
						iconProps={{ className: "icon-black" }}
						className="text-black"
						onClick={() => toast.success("Copied")}
					>
						{NEXT_PUBLIC_CONTACT_RECIPIENT}
					</Copyable>
				</li>
				<li className="flex items-center justify-center gap-4">
					<Tooltip direction="down" title="GitHub">
						<Link target={"_blank"} href={NEXT_PUBLIC_GITHUB_PROFILE_URL}>
							<IconButton variant="circle" className="border-0">
								<GitHub className="icon-black" />
							</IconButton>
						</Link>
					</Tooltip>
					<Tooltip direction="down" title="Linkedin">
						<Link target={"_blank"} href={NEXT_PUBLIC_LINKEDIN_PROFILE_URL}>
							<IconButton variant="circle" className="border-0">
								<LinkedIn className="icon-black" />
							</IconButton>
						</Link>
					</Tooltip>
				</li>
			</ul>
			<ul className="flex items-center justify-between p-6 backdrop-blur-lg">
				<li>
					<Link href={"/"}>
						<H1 className="flex items-center gap-1 text-lg font-extrabold sm:text-2xl">
							<span>Dave The Developer</span>
							<span className="text-yellow-400">/</span>
						</H1>
					</Link>
				</li>
				<li>
					<ul className="flex items-center gap-6 sm:gap-12">
						<SignOutButton />
						{LINKS.map(({ href, title }) => (
							<li key={href}>
								<NavLink href={href} isActive={pathname === href}>
									{title}
								</NavLink>
							</li>
						))}
						<li onClick={toggleDarkMode}>
							{darkModeIsActive ? (
								<SunLight className="!h-5 !w-5" />
							) : (
								<HalfMoon className="!h-5 !w-5" />
							)}
						</li>
					</ul>
				</li>
			</ul>
		</motion.nav>
	);
}

export default Navbar;
