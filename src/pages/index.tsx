import Badge from "@components/Badge";
import Button from "@components/Button";
import IconLink from "@components/IconLink";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import useAge from "@hooks/useAge";
import Head from "next/head";

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
			<main
				className="absolute top-1/2 left-1/2 max-w-full -translate-x-1/2
							-translate-y-1/2 transform overflow-hidden"
			>
				<div className="mt-12 flex flex-col items-center">
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
			</main>
		</>
	);
}
