import IconLink from "@components/IconLink";
import ProjectImage from "@components/Images/ProjectImage";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _ProjectListItemProps = {
	id: number;
	alias: string;
	imageUrl: string | null;
	description: string | null;
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
	...props
}: ProjectListItemProps) {
	return (
		<div className={cn(`flex gap-6`, className)} {...props}>
			<ProjectImage src={imageUrl} />
			<div className="flex min-w-0 flex-col items-start gap-4 pt-2">
				<div className="flex max-w-full flex-col gap-2">
					<IconLink useArrowUp href={`/project/${id}`}>
						<h1 className="truncate text-3xl font-semibold">{alias}</h1>
					</IconLink>
					<p className="text-secondary">{description}</p>
				</div>
				<div className="flex items-start justify-start gap-2">{tags}</div>
			</div>
		</div>
	);
}

export default ProjectListItem;
