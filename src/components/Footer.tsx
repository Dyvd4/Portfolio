import IconButton from '@components/IconButton';
import Tooltip from '@components/Tooltip';
import Link from 'next/link';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { AiFillMail } from "react-icons/ai";
import { BsLinkedin } from 'react-icons/bs';

type _NavbarProps = {}

export type NavbarProps = PropsWithChildren<_NavbarProps> &
	Omit<ComponentPropsWithRef<'div'>, keyof _NavbarProps>

function Navbar({ className, ...props }: NavbarProps) {

	return (
		<footer className='p-4 w-full border-t
							flex justify-between items-center'>
			<div className='text-secondary text-xs'>
				© 2023 by David Kimmich. All rights reserved.
			</div>
			<div className='flex justify-center items-center gap-2'>
				<Tooltip
					direction="up"
					title="Linkedin">
					<Link
						target={"_blank"}
						href="https://www.linkedin.com/in/david-kimmich-21430623b/">
						<IconButton variant="circle" className="border-gray-400">
							<BsLinkedin />
						</IconButton>
					</Link>
				</Tooltip>
				<Tooltip
					direction="up"
					title="Mail to: david.kimmich@gmx.net">
					<Link href={"mailto:david.kimmich@gmx.net"}>
						<IconButton variant="circle" className="border-gray-400">
							<AiFillMail />
						</IconButton>
					</Link>
				</Tooltip>
			</div>
		</footer>
	)
}

export default Navbar;