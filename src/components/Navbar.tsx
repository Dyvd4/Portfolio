import IconButton from "@components/IconButton";
import Tooltip from "@components/Tooltip";
import { toggleDarkMode } from "@utils/DarkModeUtils";
import Link from "next/link";
import { FaAdjust, FaEnvelopeOpenText, FaHome } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import { SiAboutdotme } from "react-icons/si";

type NavbarProps = {}

function Navbar(props: NavbarProps) {
    return (
        <nav className="pl-4 pt-4 pr-4 pb-14 flex justify-end">
            <ul className="flex items-center gap-2">
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
                        title="Contact">
                        <Link href="/Contact">
                            <IconButton>
                                <FaEnvelopeOpenText />
                            </IconButton>
                        </Link>
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
                        <Link href={"/AboutMe"}>
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
        </nav>
    )
}

export default Navbar;