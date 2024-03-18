"use client";
import Badge from "@components/Badge";
import ExperienceCard, { ExperienceCardProps } from "@components/ExperienceCard";
import IconLink from "@components/IconLink";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import coworkerPic from "@public/david-kimmich.jpg";
import CsharpImg from "@public/experience-cards/Csharp.png";
import CssImg from "@public/experience-cards/CSS.svg";
import ExpressJsImg from "@public/experience-cards/ExpressJs.png";
import GitHubImg from "@public/experience-cards/GitHub.svg";
import T3Img from "@public/experience-cards/t3-dark.svg";
import AwsImg from "@public/experience-cards/AWS.png";
import HtmlImg from "@public/experience-cards/HTML.svg";
import NestJsImg from "@public/experience-cards/NestJS.png";
import NextJsImg from "@public/experience-cards/NextJs.svg";
import NodeJsImg from "@public/experience-cards/NodeJs.svg";
import ReactImg from "@public/experience-cards/React.svg";
import SqlImg from "@public/experience-cards/Sql.png";
import GoImg from "@public/experience-cards/Go.svg";
import TailwindCssImg from "@public/experience-cards/tailwind-css.svg";
import TypeScriptImg from "@public/experience-cards/TypeScript.svg";
import Image from "next/image";
import Link from "next/link";
import { H1 } from "@components/H1";
import { H2 } from "@components/H2";

const CONTACT_RECIPIENT = process.env.NEXT_PUBLIC_CONTACT_RECIPIENT;

type AboutMeProps = {};

const LANGUAGES: ExperienceCardProps[] = [
	{
		title: "TypeScript",
		imageProps: {
			src: TypeScriptImg,
			alt: "TypeScript",
		},
	},
	{
		title: "C#",
		imageProps: {
			src: CsharpImg,
			alt: "C#",
		},
	},
	{
		title: "SQL",
		imageProps: {
			src: SqlImg,
			alt: "SQL",
		},
	},
	{
		title: "Go",
		imageProps: {
			src: GoImg,
			alt: "Go",
		},
	},
];

const TECHNOLOGIES: ExperienceCardProps[] = [
	{
		title: "HTML",
		imageProps: {
			src: HtmlImg,
			alt: "HTML",
		},
	},
	{
		title: "CSS",
		imageProps: {
			src: CssImg,
			alt: "CSS",
		},
	},
	{
		title: "Tailwind CSS",
		imageProps: {
			src: TailwindCssImg,
			alt: "Tailwind CSS",
		},
	},
	{
		title: "React",
		imageProps: {
			src: ReactImg,
			alt: "React",
		},
	},
	{
		title: "Next.js",
		imageProps: {
			src: NextJsImg,
			alt: "Next.js",
		},
	},
	{
		title: "Node.js",
		imageProps: {
			src: NodeJsImg,
			alt: "Node.js",
		},
	},
	{
		title: "NestJS",
		imageProps: {
			src: NestJsImg,
			alt: "NestJS",
		},
	},
	{
		title: "Express.js",
		imageProps: {
			src: ExpressJsImg,
			alt: "Express.js",
		},
	},
	{
		title: "GitHub",
		imageProps: {
			src: GitHubImg,
			alt: "GitHub",
		},
	},
	{
		title: "T3 Stack",
		imageProps: {
			src: T3Img,
			alt: "T3 Stack",
		},
	},
	{
		title: "AWS",
		imageProps: {
			src: AwsImg,
			alt: "AWS",
		},
	},
];

function AboutMe(props: AboutMeProps) {
	useBreadcrumb([
		{
			isHome: true,
		},
		{
			children: "about me",
			isCurrentPage: true,
		},
	]);

	return (
		<main className="dark:text-white">
			<Image
				placeholder="blur"
				src={coworkerPic}
				alt="David Kimmich"
				height={300}
				className="mx-auto rounded-lg"
			/>
			<section className="mt-16">
				<H1>About me</H1>
				<div className="mt-8">
					<p>
						Hi! I am David Kimmich, a web dev from Germany. I like to create web apps
						that feel: &nbsp;
					</p>
					<ul className="mt-2 flex list-inside list-disc flex-col gap-1">
						<li>
							<Badge variant="yellow">
								<b>Intuitive.</b>
							</Badge>
						</li>
						<li>
							<Badge variant="green">
								<b>Useful.</b>
							</Badge>
						</li>
						<li>
							<Badge variant="pink">
								<b>Beautiful.</b>
							</Badge>
						</li>
					</ul>
				</div>
			</section>
			<section className="mt-12">
				<H1>Experiences</H1>
				<div className="mt-8">
					<H2 className="mt-4 text-lg font-bold">Languages:</H2>
					<ul className="mt-6 grid w-fit list-inside grid-cols-2 gap-6 sm:grid-cols-4">
						{LANGUAGES.map((cardProps) => (
							<li key={cardProps.title}>
								{" "}
								<ExperienceCard {...cardProps} />{" "}
							</li>
						))}
					</ul>
					<H2 className="mt-8 text-lg font-bold">Technologies:</H2>
					<ul className="mt-6 grid w-fit list-inside grid-cols-2 gap-6 sm:grid-cols-4">
						{TECHNOLOGIES.map((cardProps) => (
							<li key={cardProps.title} className="min-h-0 min-w-0">
								{" "}
								<ExperienceCard {...cardProps} />{" "}
							</li>
						))}
					</ul>
				</div>
			</section>
			<section className="mt-12">
				<H1>Projects</H1>
				<div className="mt-4">
					<span className="mr-2">See:</span>
					<b>
						<IconLink className="inline-flex" href={"/project"}>
							my projects
						</IconLink>
					</b>
				</div>
			</section>
			<section className="mt-12 pb-20">
				<H1>Contact</H1>
				<p className="mt-4">
					Write an&nbsp;
					<b>
						<Link className="hover:underline" href={`mailto:${CONTACT_RECIPIENT}`}>
							<b>e-mail to {CONTACT_RECIPIENT}</b>
						</Link>
					</b>
					&nbsp;or check the social media links in the footer.
				</p>
			</section>
		</main>
	);
}

export default AboutMe;
