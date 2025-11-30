import ExperienceCard from "@components/ExperienceCard";
import { H2 } from "@components/H2";
import { LandingPageSection } from "@components/Sections/LandingPageSection";
import AngularImg from "@public/experience-cards/Angular.gif";
import AwsImg from "@public/experience-cards/AWS.png";
import DrizzleImg from "@public/experience-cards/drizzle.png";
import ExpressJsImg from "@public/experience-cards/ExpressJs.png";
import FiberImg from "@public/experience-cards/fiber.png";
import FigmaImg from "@public/experience-cards/Figma.png";
import GitHubImg from "@public/experience-cards/GitHub.svg";
import KnockoutImg from "@public/experience-cards/knockout.png";
import NestJsImg from "@public/experience-cards/NestJS.png";
import NextJsImg from "@public/experience-cards/NextJs.svg";
import NodeJsImg from "@public/experience-cards/NodeJs.svg";
import PrismaImg from "@public/experience-cards/prisma.png";
import ReactImg from "@public/experience-cards/React.svg";
import TailwindCssImg from "@public/experience-cards/tailwind-css.svg";
import TeamCityImg from "@public/experience-cards/teamcity.png";
import tRPC from "@public/experience-cards/tRPC.svg";
import { motion } from "motion/react";

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
				name: "Angular",
				imageProps: {
					src: AngularImg,
					alt: "Angular",
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
				name: "tRPC",
				imageProps: {
					src: tRPC,
					alt: "tRPC",
				},
			},
			{
				name: "Knockout.js",
				imageProps: {
					src: KnockoutImg,
					alt: "Express.js",
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
				name: "Prisma",
				imageProps: {
					src: PrismaImg,
					alt: "Prisma",
				},
			},
			{
				name: "Drizzle",
				imageProps: {
					src: DrizzleImg,
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
	{
		title: "Design",
		technologies: [
			{
				name: "Figma",
				imageProps: {
					src: FigmaImg,
					alt: "Figma",
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
						className="flex flex-col items-center gap-3 sm:items-start"
						key={group.title}
					>
						<H2>{group.title}</H2>
						<ul className="flex flex-wrap gap-3 sm:justify-start">
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
