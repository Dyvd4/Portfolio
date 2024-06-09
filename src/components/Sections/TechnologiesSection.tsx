import ExperienceCard from "@components/ExperienceCard";
import { H2 } from "@components/H2";
import { LandingPageSection } from "@components/Sections/LandingPageSection";
import AwsImg from "@public/experience-cards/AWS.png";
import ExpressJsImg from "@public/experience-cards/ExpressJs.png";
import GitHubImg from "@public/experience-cards/GitHub.svg";
import NestJsImg from "@public/experience-cards/NestJS.png";
import NextJsImg from "@public/experience-cards/NextJs.svg";
import NodeJsImg from "@public/experience-cards/NodeJs.svg";
import ReactImg from "@public/experience-cards/React.svg";
import FiberImg from "@public/experience-cards/fiber.png";
import T3Img from "@public/experience-cards/t3-dark.svg";
import TailwindCssImg from "@public/experience-cards/tailwind-css.svg";
import TeamCityImg from "@public/experience-cards/teamcity.png";
import { motion } from "framer-motion";

const TECHNOLOGY_GROUPS = [
	{
		title: "Frontend development",
		technologies: [
			{
				name: "Next.js",
				imageProps: {
					src: NextJsImg,
					alt: "Next.js",
				},
			},
			{
				name: "React",
				imageProps: {
					src: ReactImg,
					alt: "React",
				},
			},
			{
				name: "Tailwind CSS",
				imageProps: {
					src: TailwindCssImg,
					alt: "Tailwind CSS",
				},
			},
			{
				name: "T3 Stack",
				imageProps: {
					src: T3Img,
					alt: "T3 Stack",
				},
			},
		],
	},
	{
		title: "Backend development",
		technologies: [
			{
				name: "Node.js",
				imageProps: {
					src: NodeJsImg,
					alt: "Node.js",
				},
			},
			{
				name: "NestJS",
				imageProps: {
					src: NestJsImg,
					alt: "NestJS",
				},
			},
			{
				name: "Express.js",
				imageProps: {
					src: ExpressJsImg,
					alt: "Express.js",
				},
			},
			{
				name: "Fiber",
				imageProps: {
					src: FiberImg,
					alt: "Fiber",
				},
			},
		],
	},
	{
		title: "CI/CD",
		technologies: [
			{
				name: "GitHub Actions",
				imageProps: {
					src: GitHubImg,
					alt: "GitHub Actions",
				},
			},
			{
				name: "AWS",
				imageProps: {
					src: AwsImg,
					alt: "AWS",
				},
			},
			{
				name: "TeamCity",
				imageProps: {
					src: TeamCityImg,
					alt: "TeamCity",
				},
			},
		],
	},
];

export function TechnologiesSection() {
	return (
		<LandingPageSection heading="Technologies" subheading="What I play with">
			<motion.ul
				variants={{
					show: {
						transition: {
							delayChildren: 0.5,
							staggerChildren: 0.25,
						},
					},
				}}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				className="mt-16 flex flex-col gap-x-10 gap-y-12 px-6 sm:mt-20 sm:grid sm:grid-cols-2"
			>
				{TECHNOLOGY_GROUPS.map((group) => (
					<motion.li
						variants={{
							hidden: { opacity: 0, transform: "translateY(100%)" },
							show: {
								opacity: 1,
								transform: "translateY(0%)",
								transition: { duration: 0.5 },
							},
						}}
						className="flex flex-col items-start gap-3"
						key={group.title}
					>
						<H2>{group.title}</H2>
						<ul className="flex flex-wrap gap-3">
							{group.technologies.map((language) => (
								<li className="flex items-center gap-3" key={language.name}>
									<ExperienceCard
										title={language.name}
										imageProps={language.imageProps}
									/>
								</li>
							))}
						</ul>
					</motion.li>
				))}
			</motion.ul>
		</LandingPageSection>
	);
}
