import DownloadResumeButton from "@components/DownloadResumeButton";
import { LandingPageSection } from "@components/Sections/LandingPageSection";
import { Experience, WorkExperienceWrapper } from "@components/WorkExperienceWrapper";
import LMobileImg from "@public/work-experience/l_mobile.jpg";
import NexobilityImg from "@public/work-experience/nexobility_gmbh.png";
import { motion } from "motion/react";

const experiences: Experience[] = [
	{
		title: "Software developer",
		dateStarted: new Date(2024, 8),
		dateEnded: new Date(2025, 7),
		employmentType: "Fulltime",
		organization: {
			name: "Nexobility GmbH",
			icon: NexobilityImg,
			link: "https://www.betterpark.de",
		},
	},
	{
		title: "Project Engineer",
		dateStarted: new Date(2023, 6),
		dateEnded: new Date(2024, 6),
		employmentType: "Fulltime",
		organization: {
			name: "L-mobile",
			icon: LMobileImg,
			link: "https://l-mobile.com",
		},
	},
	{
		title: "Fachinformatiker für Anwendungswickler",
		dateStarted: new Date(2020, 8),
		dateEnded: new Date(2023, 6),
		employmentType: "Trainee",
		organization: {
			name: "L-mobile",
			icon: LMobileImg,
			link: "https://l-mobile.com",
		},
	},
];

export function WorkExperienceSection() {
	const initial = { opacity: 0, transform: "translateY(100%)" };
	const whileInView = {
		opacity: 1,
		transform: "translateY(0%)",
		transition: {
			duration: 0.5,
		},
	};
	const viewPort = {
		margin: "100px",
		once: true,
	};
	return (
		<LandingPageSection id="work" heading="Work Experience">
			<motion.div initial={initial} whileInView={whileInView} viewport={viewPort}>
				<WorkExperienceWrapper
					className="mt-16 px-6 lg:mt-20 lg:px-0"
					experiences={experiences}
				/>
			</motion.div>
			<motion.div initial={initial} whileInView={whileInView} viewport={viewPort}>
				<DownloadResumeButton />
			</motion.div>
		</LandingPageSection>
	);
}
