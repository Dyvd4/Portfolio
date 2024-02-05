"use client";
import IconButton from "@components/IconButton";
import Tooltip from "@components/Tooltip";
import config from "@config/config";
import dayjs from "dayjs";
import Link from "next/link";
import { ComponentPropsWithRef, PropsWithChildren } from "react";
import { GitHub, LinkedIn, Mail } from "./Icons";
import useModalDisclosure from "./Modal/hooks/useModalDisclosure";
import ContactModal from "./Modals/ContactModal";

const { NEXT_PUBLIC_GITHUB_PROFILE_URL, NEXT_PUBLIC_LINKEDIN_PROFILE_URL } = config;
type _NavbarProps = {};

export type NavbarProps = PropsWithChildren<_NavbarProps> &
	Omit<ComponentPropsWithRef<"div">, keyof _NavbarProps>;

function Navbar({ className, ...props }: NavbarProps) {
	const { isActive, open, close } = useModalDisclosure();

	return (
		<footer
			className="flex w-full
							items-center justify-between p-6"
		>
			<div className="text-secondary text-xs">
				© {dayjs().year()} by David Kimmich. All rights reserved.
			</div>
			<div className="flex items-center justify-center gap-4">
				<Tooltip direction="up" title="GitHub">
					<Link target={"_blank"} href={NEXT_PUBLIC_GITHUB_PROFILE_URL}>
						<IconButton variant="circle" className="border-0">
							<GitHub />
						</IconButton>
					</Link>
				</Tooltip>
				<Tooltip direction="up" title="Linkedin">
					<Link target={"_blank"} href={NEXT_PUBLIC_LINKEDIN_PROFILE_URL}>
						<IconButton variant="circle" className="border-0">
							<LinkedIn />
						</IconButton>
					</Link>
				</Tooltip>
				<Tooltip direction="left" title="Contact">
					<IconButton onClick={open} variant="circle" className="border-0">
						<Mail />
					</IconButton>
				</Tooltip>
			</div>
			<ContactModal isActive={isActive} close={close} />
		</footer>
	);
}

export default Navbar;
