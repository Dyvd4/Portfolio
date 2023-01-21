import IconButton from "@components/IconButton";
import Tooltip from "@components/Tooltip";
import { toggleDarkMode } from "@utils/DarkModeUtils";
import Link from "next/link";
import { FaAdjust, FaBars, FaEnvelopeOpenText, FaHome } from "react-icons/fa";

type NavbarProps = {}

function Navbar(props: NavbarProps) {
    return (
        <nav className="fixed top-0 right-0 p-4">
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
                        title="Home">
                        <Link href={"/"}>
                            <IconButton>
                                <FaHome />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </li>
                <li title='Menu'>
                    <IconButton>
                        <FaBars />
                    </IconButton>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;