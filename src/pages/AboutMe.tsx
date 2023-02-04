import Badge from "@components/Badge";
import useAge from "@hooks/useAge";
import Image from "next/image";
import Link from "next/link";
import coworkerPic from "../../public/david-kimmich.jpg";

type AboutMeProps = {}

const LANGUAGES = ["HTML", "CSS", "TypeScript", "C#", "SQL"]
const TECHNOLOGIES = ["React", "Tailwind CSS", "Node.js"];

function AboutMe(props: AboutMeProps) {

	const age = useAge()

	return (
		<>
			<Image
				src={coworkerPic}
				alt="David Kimmich"
				height={300}
				className="rounded-lg mx-auto"
			/>
			<section className="mt-16">
				<h1 className='text-5xl font-black'>
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
				<h1 className='text-5xl font-black'>
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
			<section className="mt-10 pb-20">
				<h1 className='text-5xl font-black'>
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
		</>
	);
}

export default AboutMe;