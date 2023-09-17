import Badge from "@components/Badge";
import IconLink from "@components/IconLink";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import useAge from "@hooks/useAge";
import useCurrentUrl from "@hooks/useCurrentUrl";
import useStaticImageUrl from "@hooks/useStaticImageUrl";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import coworkerPic from "@public/david-kimmich.jpg";
import aboutMePageOpenGraphImage from "@public/og/about-me-page.png";

type AboutMeProps = {};

const LANGUAGES = ["TypeScript", "C#", "SQL"];
const TECHNOLOGIES = [
	"HTML",
	"CSS",
	"Tailwind CSS",
	"React",
	"Next.js",
	"Node.js",
	"NestJS",
	"Express.js",
	"GitHub",
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

	const age = useAge();
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
							Hi! I am David Kimmich, a {age} old web dev. I like to create web apps
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
				<section className="mt-10">
					<h1 className="text-4xl font-black sm:text-5xl">Experiences</h1>
					<div className="mt-4 px-4">
						I have experience with the following...
						<h3 className="mt-2 font-bold">Languages:</h3>
						<ul className="mt-2 flex list-inside list-disc flex-col gap-1">
							{LANGUAGES.map((technology) => (
								<li key={technology}>
									<Badge variant="indigo">{technology}</Badge>
								</li>
							))}
						</ul>
						<h3 className="mt-2 font-bold">Technologies:</h3>
						<ul className="mt-2 flex list-inside list-disc flex-col gap-1">
							{TECHNOLOGIES.map((technology) => (
								<li key={technology}>
									<Badge variant="indigo">{technology}</Badge>
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
