import Badge from "@components/Badge";
import Button from "@components/Button";
import IconLink from "@components/IconLink";
import LatestProjectSection from "@components/Sections/LatestProjectSection";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import useAge from "@hooks/useAge";
import { prisma } from "@prisma";
import Head from "next/head";

export async function getServerSideProps() {
	const latestCommit = await prisma.projectCommit.findFirst({
		select: {
			projectId: true,
			project: {
				include: {
					tags: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	const latestProject = !!latestCommit ? latestCommit.project : null;
	return {
		props: {
			latestProject: JSON.parse(JSON.stringify(latestProject)) as typeof latestProject,
		},
	};
}

export default function Home(props) {
	useBreadcrumb([]);

	const age = useAge();

	return (
		<>
			<Head>
				<title>Intuitive. Useful. Beautiful.</title>
				<meta
					name="description"
					content="These are the properties a web app should have. I am David Kimmich, a 19 year old web dev. If you want to know more about me, have a look in this site!"
				/>
				<meta
					name="keywords"
					content="Intuitive, Useful, Beautiful, Portfolio, Web app, David Kimmich"
				/>
			</Head>
			<main>
				<div
					className="absolute top-1/2 left-1/2 mt-12 flex max-w-full -translate-x-1/2 -translate-y-1/2 transform
							flex-col items-center overflow-hidden"
				>
					<h1 className="flex flex-col gap-4 md:flex-row">
						<Badge
							variant="yellow"
							className="text-5xl font-black text-black dark:text-white sm:text-6xl"
						>
							Intuitive.
						</Badge>
						<Badge
							variant="green"
							className="text-5xl font-black text-black dark:text-white sm:text-6xl"
						>
							Useful.
						</Badge>
						<Badge
							variant="pink"
							className="text-5xl font-black text-black dark:text-white sm:text-6xl"
						>
							Beautiful.
						</Badge>
					</h1>
					<div className="mt-10 text-center">
						<p className="text-secondary">
							These are the properties a web app should have.
						</p>
						<p className="text-secondary mt-4 md:mt-0">
							I am David Kimmich, a {age} year old web dev.
						</p>
					</div>
					<Button className="group mt-10">
						<IconLink variant="black" href={"/project"}>
							My projects
						</IconLink>
					</Button>
				</div>
				<LatestProjectSection latestProject={props.latestProject} />
			</main>
		</>
	);
}
