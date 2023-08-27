import IconButton from '@components/IconButton';
import Tooltip from '@components/Tooltip';
import modalIsActiveAtom from '@context/atoms/ModalIsActiveAtom';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { LinkedIn, Mail } from './Icons';
import ContactModal from './Modals/ContactModal';

type _NavbarProps = {}

export type NavbarProps = PropsWithChildren<_NavbarProps> &
	Omit<ComponentPropsWithRef<'div'>, keyof _NavbarProps>

function Navbar({ className, ...props }: NavbarProps) {
	const [, setModalIsActive] = useAtom(modalIsActiveAtom)
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
					title="Contact">
					<IconButton onClick={() => setModalIsActive(true)} variant="circle" className="border-0">
						<Mail />
					</IconButton>
				</Tooltip>
			</div>
			<ContactModal />
		</footer>
	)
}

export default Navbar;