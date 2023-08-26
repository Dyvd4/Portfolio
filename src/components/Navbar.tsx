import IconButton from "@components/IconButton";
import Tooltip from "@components/Tooltip";
import { toggleDarkMode } from "@utils/DarkModeUtils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaAdjust, FaHome } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { SiAboutdotme } from "react-icons/si";
import Button from "./Button";

type NavbarProps = {}

function Navbar(props: NavbarProps) {
	const { status } = useSession()
	return (
		<nav className="pl-4 pt-4 pr-4 pb-8 sticky top-0 z-50">
			<ul className="flex justify-between items-center gap-2">
				<li>
					<Link href={"/"}>
						<Image src={"/Logo.png"} alt="Logo" width={50} height={50} />
					</Link>
				</li>
				<li>
					<ul className="flex items-center gap-2">
						{status === "authenticated" && <>
							<Button onClick={() => signOut()} className="sm:text-xs">Sign out</Button>
							<Link href={"/project/create"}>
								<Button className="sm:text-xs">Create project</Button>
							</Link>
						</>}
						<li>
							<Tooltip
								direction="down"
								title="Dark mode">
								<IconButton onClick={toggleDarkMode}>
									<FaAdjust />
								</IconButton>
							</Tooltip>
						</li>
						<li>
							<Tooltip
								direction="down"
								title="My projects">
								<Link href={"/project"}>
									<IconButton>
										<HiFire />
									</IconButton>
								</Link>
							</Tooltip>
						</li>
						<li>
							<Tooltip
								direction="down"
								title="About me">
								<Link href={"/about-me"}>
									<IconButton>
										<SiAboutdotme />
									</IconButton>
								</Link>
							</Tooltip>
						</li>
						<li>
							<Tooltip
								direction="down"
								title="Home">
								<Link href={"/"}>
									<IconButton>
										<FaHome />
									</IconButton>
								</Link>
							</Tooltip>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar;