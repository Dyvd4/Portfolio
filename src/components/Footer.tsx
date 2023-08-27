import IconButton from '@components/IconButton';
import Tooltip from '@components/Tooltip';
import Link from 'next/link';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { LinkedIn, Mail } from './Icons';

type _NavbarProps = {}

export type NavbarProps = PropsWithChildren<_NavbarProps> &
	Omit<ComponentPropsWithRef<'div'>, keyof _NavbarProps>

function Navbar({ className, ...props }: NavbarProps) {

	return (
		<footer className='p-6 w-full
							flex justify-between items-center'>
			<div className='text-secondary text-xs'>
				© 2023 by David Kimmich. All rights reserved.
			</div>
			<div className='flex justify-center items-center gap-4'>
				<Tooltip
					direction="up"
					title="Linkedin">
					<Link
						target={"_blank"}
						href="https://www.linkedin.com/in/david-kimmich-21430623b/">
						<IconButton variant="circle" className="border-0">
							<LinkedIn />
						</IconButton>
					</Link>
				</Tooltip>
				<Tooltip
					direction="left"
					title="Mail to: david.kimmich@gmx.net">
					<Link href={"mailto:david.kimmich@gmx.net"}>
						<IconButton variant="circle" className="border-0">
							<Mail />
						</IconButton>
					</Link>
				</Tooltip>
			</div>
		</footer>
	)
}

export default Navbar;