"use client";
import useDarkModeIsActive from "@hooks/useDarkModeIsActive";
import { toggleDarkMode } from "@utils/dark-mode-utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HalfMoon, SunLight } from "../Icons";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";

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
	return (
		<nav className="sticky top-0 z-50 bg-white p-6 dark:bg-gray-900">
			<ul className="flex items-center justify-between gap-2">
				<li>
					<Link href={"/"}>
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
		</nav>
	);
}

export default Navbar;
