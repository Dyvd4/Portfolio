import Badge from "@components/Badge";
import LeftHeading from "@components/Headings/LeftHeading";
import IconLink from "@components/IconLink";
import LongArrowRightUp from "@components/Icons/LongArrowRightUp";
import ProjectListItem from "@components/ListItems/ProjectListItem";

type LatestProjectSectionProps = {
	latestProject: any;
};

function LatestProjectSection({ latestProject, ...props }: LatestProjectSectionProps) {
	if (!latestProject) return null;
	return (
		<section className="mt-[100vh]">
			<LeftHeading
				rightSection={
					<>
						<IconLink
							icon={
								<LongArrowRightUp
									className={`inline shrink-0 transition-transform
									group-hover:translate-x-1`}
								/>
							}
							disabled={!latestProject.url}
							href={latestProject.url || "#"}
							target={"_blank"}
						>
							Visit original site
						</IconLink>
						<IconLink
							icon={
								<LongArrowRightUp
									className={`inline shrink-0 transition-transform
									group-hover:translate-x-1`}
								/>
							}
							href={"/project"}
						>
							See all projects
						</IconLink>
					</>
				}
				className="mt-4"
			>
				Latest project
			</LeftHeading>
			<ProjectListItem
				className="mt-6 mb-12 sm:mt-12"
				id={latestProject.id}
				alias={latestProject.alias}
				imageUrl={latestProject.imageUrl}
				description={latestProject.description}
				tags={
					latestProject.tags.length > 0 ? (
						<>
							{latestProject.tags.map((tag) => (
								<Badge key={tag.name}>{tag.name}</Badge>
							))}
						</>
					) : undefined
				}
			/>
		</section>
	);
}

export default LatestProjectSection;
