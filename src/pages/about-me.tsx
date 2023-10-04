import Badge from "@components/Badge";
import ExperienceCard, { ExperienceCardProps } from "@components/ExperienceCard";
import IconLink from "@components/IconLink";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import useCurrentUrl from "@hooks/useCurrentUrl";
import useStaticImageUrl from "@hooks/useStaticImageUrl";
import coworkerPic from "@public/david-kimmich.jpg";
import CsharpImg from "@public/experience cards/Csharp.png";
import CssImg from "@public/experience cards/CSS.svg";
import ExpressJsImg from "@public/experience cards/ExpressJs.png";
import GitHubImg from "@public/experience cards/GitHub.svg";
import HtmlImg from "@public/experience cards/HTML.svg";
import NestJsImg from "@public/experience cards/NestJS.png";
import NextJsImg from "@public/experience cards/NextJs.svg";
import NodeJsImg from "@public/experience cards/NodeJs.svg";
import ReactImg from "@public/experience cards/React.svg";
import SqlImg from "@public/experience cards/Sql.png";
import TailwindCssImg from "@public/experience cards/tailwind-css.svg";
import TypeScriptImg from "@public/experience cards/TypeScript.svg";
import aboutMePageOpenGraphImage from "@public/og/about-me-page.png";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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

	const currentUrl = useCurrentUrl();
	const ogImageUrl = useStaticImageUrl(aboutMePageOpenGraphImage);

	const metaTitle = "About me";
	const metaDescription =
		"Here is an overview about me, my experiences and what technologies I use.";
	const metaTags =
		"About me, Experiences, Skills, Technologies, Contact, Programming languages, David Kimmich";
	return (
		<>
			<Head>
				<title>{metaTitle}</title>
				<meta name="description" content={metaDescription} />
				<meta name="keywords" content={metaTags} />

				{/* Facebook Meta Tags */}
				<meta property="og:url" content={currentUrl} />
				<meta property="og:image" content={ogImageUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={metaTitle} />
				<meta property="og:description" content={metaDescription} />
				{/* Twitter Meta Tags */}
				<meta property="twitter:url" content={currentUrl} />
				<meta property="twitter:image" content={ogImageUrl} />
				<meta name="twitter:title" content={metaTitle} />
				<meta name="twitter:description" content={metaDescription} />
			</Head>
			<main className="dark:text-white">
				<Image
					placeholder="blur"
					src={coworkerPic}
					alt="David Kimmich"
					height={300}
					className="mx-auto rounded-lg"
				/>
				<section className="mt-16">
					<h1 className="text-4xl font-black sm:text-5xl">About me</h1>
					<div className="mt-4 px-4">
						<p>
							Hi! I am David Kimmich, a web dev from Germany. I like to create web
							apps that feel: &nbsp;
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
				<section className="mt-10">
					<h1 className="text-4xl font-black sm:text-5xl">Experiences</h1>
					<div className="mt-4 px-4">
						<h3 className="mt-2 text-lg font-bold">Languages:</h3>
						<ul className="mt-4 grid w-fit list-inside grid-cols-2 gap-6 sm:grid-cols-4">
							{LANGUAGES.map((cardProps) => (
								<li key={cardProps.title}>
									{" "}
									<ExperienceCard {...cardProps} />{" "}
								</li>
							))}
						</ul>
						<h3 className="mt-4 text-lg font-bold">Technologies:</h3>
						<ul className="mt-4 grid w-fit list-inside grid-cols-2 gap-6 sm:grid-cols-4">
							{TECHNOLOGIES.map((cardProps) => (
								<li key={cardProps.title} className="min-h-0 min-w-0">
									{" "}
									<ExperienceCard {...cardProps} />{" "}
								</li>
							))}
						</ul>
					</div>
				</section>
				<section className="mt-10">
					<h1 className="text-4xl font-black sm:text-5xl">Projects</h1>
					<div className="mt-4 px-4">
						<span className="mr-2">See:</span>
						<b>
							<IconLink className="inline-flex" href={"/project"}>
								my projects
							</IconLink>
						</b>
					</div>
				</section>
				<section className="mt-10 pb-20">
					<h1 className="text-4xl font-black sm:text-5xl">Contact</h1>
					<p className="mt-4 px-4">
						Write an&nbsp;
						<b>
							<Link className="hover:underline" href={"mailto:david.kimmich@gmx.net"}>
								<b>e-mail to david.kimmich@gmx.net</b>
							</Link>
						</b>
						&nbsp;or check the social media links in the footer.
					</p>
				</section>
			</main>
		</>
	);
}

export default AboutMe;
