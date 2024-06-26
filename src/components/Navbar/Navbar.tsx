"use client";
import Copyable from "@components/Copyable";
import { H1 } from "@components/H1";
import IconButton from "@components/IconButton";
import Tooltip from "@components/Tooltip";
import config from "@config/config";
import useDarkModeIsActive from "@hooks/useDarkModeIsActive";
import { toggleDarkMode } from "@utils/dark-mode-utils";
import { motion } from "framer-motion";
import Image from "next/image";
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
		href: "/#services",
		title: "Services",
	},
	{
		href: "/#work",
		title: "Work",
	},
];

function Navbar({ darkModeIsActive: initialDarkModeIsActive }: NavbarProps) {
	const pathname = usePathname();
	const darkModeIsActive = useDarkModeIsActive(initialDarkModeIsActive);
	const [navHeaderIsHidden, setNavHeaderIsHidden] = useState(false);
	const [intersectingSections, setIntersectingSections] = useState<string[]>([]);

	useEffect(() => {
		const threshold = 50;
		setNavHeaderIsHidden(window.scrollY > threshold);
		window.addEventListener("scroll", (e) => {
			setNavHeaderIsHidden(window.scrollY > threshold);
		});
	}, []);

	useEffect(() => {
		setIntersectingSections([]);
		const observer = observe();
		return () => {
			unobserve(observer);
		};
	}, [pathname]);

	const observe = () => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !intersectingSections.includes(entry.target.id)) {
					setIntersectingSections((s) => [...s, entry.target.id]);
				} else if (!entry.isIntersecting) {
					setIntersectingSections((s) => [...s.filter((s) => s !== entry.target.id)]);
				}
			});
		});

		LINKS.map((link) => document.getElementById(link.href.split("#")[1])!)
			.filter((s) => !!s)
			.forEach((element) => {
				observer.observe(element);
			});
		return observer;
	};

	const unobserve = (observer: IntersectionObserver) => {
		LINKS.map((link) => document.getElementById(link.href.split("#")[1])!)
			.filter((s) => !!s)
			.forEach((element) => {
				observer.unobserve(element);
			});
		observer.disconnect();
	};

	return (
		<motion.nav
			initial={{
				transform: "translateY(0%)",
			}}
			animate={{ transform: navHeaderIsHidden ? "translateY(-57px)" : "translateY(0px)" }}
			transition={{ duration: 0.25 }}
			className="sticky top-0 z-50 bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70"
		>
			<ul className="sticky z-40 flex items-center justify-between bg-[#fef5db] px-4 py-2 dark:bg-white">
				<li className="flex items-center gap-2">
					<Mail
						className="[&.icon:hover>path]:stroke-black
									dark:[&.icon:hover>path]:stroke-black
										[&.icon>path]:!stroke-black"
					/>
					<Copyable
						iconProps={{
							className: `[&.icon:hover>path]:stroke-black
										dark:[&.icon:hover>path]:stroke-black
										[&.icon>path]:!stroke-black`,
						}}
						className="text-black"
						onClick={() => toast.success("Copied")}
					>
						{NEXT_PUBLIC_CONTACT_RECIPIENT}
					</Copyable>
				</li>
				{/* moved slightly to left because tooltip is causing overflow otherwise */}
				<li className="flex items-center justify-center pr-1">
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
			<ul className="flex items-center justify-between p-3 px-6 backdrop-blur-lg md:p-6">
				<li>
					<Link href={"/"}>
						<H1 className="hidden items-center gap-1 text-lg font-extrabold sm:flex sm:text-2xl">
							<span className="whitespace-nowrap">Dave The Developer</span>
							<span className="text-yellow-400">/</span>
						</H1>
						<div className="sm:hidden">
							{darkModeIsActive && (
								<>
									<Image
										src={`/Favicon_dark.png`}
										alt="Logo"
										width={50}
										height={50}
									/>
								</>
							)}
							{!darkModeIsActive && (
								<>
									<Image
										src={`/Favicon_light.png`}
										alt="Logo"
										width={50}
										height={50}
									/>
								</>
							)}
						</div>
					</Link>
				</li>
				<li>
					<ul className="flex items-center gap-6 sm:gap-12">
						<SignOutButton />
						{LINKS.map(({ href, title }) => (
							<li key={href}>
								<NavLink
									className="whitespace-nowrap"
									href={href}
									isActive={
										intersectingSections[intersectingSections.length - 1] ===
										href.split("#")[1]
									}
								>
									{title}
								</NavLink>
							</li>
						))}
						<li className="hidden sm:block" key={"/project"}>
							<NavLink href={"/project"} isActive={pathname === "/project"}>
								Projects
							</NavLink>
						</li>
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
