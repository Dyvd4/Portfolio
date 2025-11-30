import { ComponentPropsWithRef, PropsWithChildren, type JSX } from "react";

type _CardProps = {
	title: React.ReactNode;
	description?: string | null;
	tags?: JSX.Element;
};

export type CardProps = PropsWithChildren<_CardProps> &
	Omit<ComponentPropsWithRef<"div">, keyof _CardProps>;

function Card({ className, title, description, tags, ...props }: CardProps) {
	return (
		<div
			className={`max-w-sm rounded-lg border border-gray-200 bg-white
						p-6 shadow dark:border-gray-700
						dark:bg-gray-800 ${className}`}
			{...props}
		>
			<h5 className="text-2xl font-bold leading-none">{title}</h5>
			{!!description && (
				<>
					<p className="text-secondary mt-2 font-normal dark:text-gray-400">
						{description}
					</p>
				</>
			)}
			{!!tags && (
				<>
					<ul className="mt-2 flex flex-wrap gap-2">{tags}</ul>
				</>
			)}
		</div>
	);
}

export default Card;
