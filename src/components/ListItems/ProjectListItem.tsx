import IconLink from "@components/IconLink";
import LongArrowRightUp from "@components/Icons/LongArrowRightUp";
import ProjectImage from "@components/Images/ProjectImage";
import { cn } from "@utils/component-utils";
import Link from "next/link";
import { ComponentPropsWithRef, PropsWithChildren, type JSX } from "react";

type _ProjectListItemProps = {
	id: number;
	alias: string;
	imageUrl: string;
	description: string | null;
	url?: string;
	tags?: JSX.Element;
};

export type ProjectListItemProps = _ProjectListItemProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ProjectListItemProps>;

function ProjectListItem({
	className,
	children,
	imageUrl,
	alias,
	description,
	id,
	tags,
	url,
	...props
}: ProjectListItemProps) {
	const projectLink = url || "#";
	return (
		<div
			className={cn(`flex flex-col-reverse gap-4 sm:flex-row sm:gap-6`, className)}
			{...props}
		>
			<Link className="w-fit shrink-0" target="_blank" href={projectLink}>
				<ProjectImage className="object-cover" src={imageUrl} />
			</Link>
			<div className="flex flex-col items-start gap-4 sm:pt-2">
				<div className="flex max-w-full flex-col gap-2">
					<IconLink
						icon={
							<LongArrowRightUp
								className={`inline shrink-0 transition-transform
										group-hover:translate-x-1`}
							/>
						}
						href={`/project/${id}`}
					>
						<h1 className="truncate text-3xl font-semibold">{alias}</h1>
					</IconLink>
					<p className="text-secondary">{description}</p>
				</div>
				<div className="flex flex-wrap items-start justify-start gap-2">{tags}</div>
			</div>
		</div>
	);
}

export default ProjectListItem;
