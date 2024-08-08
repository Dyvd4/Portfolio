import Badge from "@components/Badge";
import Button from "@components/Button";
import IconLink from "@components/IconLink";
import ProjectListItem from "@components/ListItems/ProjectListItem";
import { LandingPageSection } from "@components/Sections/LandingPageSection";
import { getImageUrl } from "@utils/file-utils";
import { motion } from "framer-motion";

type LatestProjectSectionProps = {
	latestProject: any;
};

function LatestProjectSection({ latestProject, ...props }: LatestProjectSectionProps) {
	if (!latestProject) return null;
	const initial = { opacity: 0, transform: "translateY(100%)" };
	const whileInView = {
		opacity: 1,
		transform: "translateY(0%)",
		transition: {
			duration: 0.5,
		},
	};
	return (
		<LandingPageSection
			className="pb-0 lg:pb-0"
			heading="Latest project"
			subheading="What I work on"
		>
			<motion.div initial={initial} whileInView={whileInView}>
				<ProjectListItem
					className="mt-16 px-6 lg:mt-20"
					id={latestProject.id}
					alias={latestProject.alias}
					imageUrl={getImageUrl(latestProject.images[0].file)}
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
					url={latestProject.url}
				/>
			</motion.div>
			<motion.div
				className="mt-16 flex items-center justify-center lg:mt-20"
				initial={initial}
				whileInView={whileInView}
			>
				<Button className="group">
					<IconLink variant="black" href={"/project"}>
						See all projects
					</IconLink>
				</Button>
			</motion.div>
		</LandingPageSection>
	);
}

export default LatestProjectSection;
