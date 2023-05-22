import Badge from "@components/Badge";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import useAge from "@hooks/useAge";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import coworkerPic from "../../public/david-kimmich.jpg";
import IconLink from "@components/IconLink";
import Button from "@components/Button";

type AboutMeProps = {}

const LANGUAGES = ["HTML", "CSS", "TypeScript", "C#", "SQL"]
const TECHNOLOGIES = ["React", "Tailwind CSS", "Node.js"];

function AboutMe(props: AboutMeProps) {

	useBreadcrumb([
		{
			isHome: true
		},
		{
			children: "about me",
			isCurrentPage: true
		}
	])

	const age = useAge()

	return (
		<>
			<Head>
				<title>About me</title>
				<meta name="description" content="Here is an overview about me, my experiences and what technologies I use." />
				<meta name="keywords" content="About me, Experiences, Skills, Technologies, Contact, Programming languages, David Kimmich" />
			</Head>
			<main>
				<Image
					placeholder="blur"
					src={coworkerPic}
					alt="David Kimmich"
					height={300}
					className="rounded-lg mx-auto"
				/>
				<section className="mt-16">
					<h1 className='text-4xl sm:text-5xl font-black'>
						About me
					</h1>
					<div className="mt-4 px-4">
						<p>
							Hi! I am David Kimmich, a {age} old web dev. I like to create web apps that feel: &nbsp;
						</p>
						<ul className="list-disc list-inside mt-2 flex flex-col gap-1">
							<li>
								<Badge variant="yellow">
									<b>
										Intuitive.
									</b>
								</Badge>
							</li>
							<li>
								<Badge variant="green">
									<b>
										Useful.
									</b>
								</Badge>
							</li>
							<li>
								<Badge variant="pink">
									<b>
										Beautiful.
									</b>
								</Badge>
							</li>
						</ul>
					</div>
				</section>
				<section className="mt-10">
					<h1 className='text-4xl sm:text-5xl font-black'>
						Experiences
					</h1>
					<div className="mt-4 px-4">
						I have experience with the following...
						<h3 className="font-bold mt-2">
							Languages:
						</h3>
						<ul className="list-disc list-inside mt-2 flex flex-col gap-1">
							{LANGUAGES.map(technology => (
								<li key={technology}>
									<Badge variant="indigo">
										{technology}
									</Badge>
								</li>
							))}
						</ul>
						<h3 className="font-bold mt-2">
							Technologies:
						</h3>
						<ul className="list-disc list-inside mt-2 flex flex-col gap-1">
							{TECHNOLOGIES.map(technology => (
								<li key={technology}>
									<Badge variant="indigo">
										{technology}
									</Badge>
								</li>
							))}
						</ul>
					</div>
				</section>
				<section className="mt-10">
					<h1 className='text-4xl sm:text-5xl font-black'>
						Projects
					</h1>
					<div className="mt-4 px-4">
						<span className="mr-2">
							See:
						</span>
						<b>
							<IconLink
								className="inline-flex"
								href={"/project"}>
								my projects
							</IconLink>
						</b>
					</div>
				</section>
				<section className="mt-10 pb-20">
					<h1 className='text-4xl sm:text-5xl font-black'>
						Contact
					</h1>
					<p className="mt-4 px-4">
						Write an&nbsp;
						<b>
							<Link
								className="hover:underline"
								href={"mailto:david.kimmich@gmx.net"}>
								<b>
									e-mail to david.kimmich@gmx.net
								</b>
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