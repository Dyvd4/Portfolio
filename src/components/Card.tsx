import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';

type _CardProps = {
	title: string
	href: LinkProps["href"]
	description?: string | null
	tags?: JSX.Element
}

export type CardProps = PropsWithChildren<_CardProps> & ComponentPropsWithRef<'div'>

function Card({ className, title, description, tags, href, ...props }: CardProps) {
	return (
		<div
			className={`max-w-sm p-6 bg-white border border-gray-200
						rounded-lg shadow dark:bg-gray-800
						dark:border-gray-700 ${className}`}
			{...props}>
			<Link href={href}>
				<h5 className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
					{title}
				</h5>
			</Link>
			{!!description && <>
				<p className="font-normal text-secondary dark:text-gray-400 mt-2">
					{description}
				</p>
			</>}
			{!!tags && <>
				<ul className='flex flex-wrap gap-2 mt-2'>
					{tags}
				</ul>
			</>}
		</div>
	);
}

export default Card;