import ProjectCommitService, { LatestCommitsView } from "@backend/services/ProjectCommitService";
import Badge from "@components/Badge";
import LeftHeading from "@components/Headings/LeftHeading";
import IconLink from "@components/IconLink";
import LongArrowRightUp from "@components/Icons/LongArrowRightUp";
import ProjectImage from "@components/Images/ProjectImage";
import ImportedFromGithubInfo from "@components/ImportedFromGithubInfo";
import CommitsTooltip from "@components/recharts/Tooltips/CommitsTooltip";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { prisma } from "@prisma";
import { Project } from "@prisma/client";
import dayjs from "dayjs";
import dayJsIsBetweenPlugin from "dayjs/plugin/isBetween";
import { NextPageContext } from "next";
import Head from "next/head";
import {
	Bar,
	BarChart,
	LabelList,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";

dayjs.extend(dayJsIsBetweenPlugin);

export async function getServerSideProps(context: NextPageContext) {
	const { id } = context.query;

	if (!id) {
		return {
			props: {
				project: null,
			},
		};
	}

	const projectLanguageAggregate = await prisma.projectLanguage.aggregate({
		where: {
			projectId: +id,
		},
		_sum: {
			codeAmountInBytes: true,
		},
	});

	const project = await prisma.project.findFirst({
		where: {
			id: +id,
		},
		select: {
			id: true,
			name: true,
			alias: true,
			githubUrl: true,
			imageUrl: true,
			url: true,
			description: true,
			visibility: true,
			updatedAt: true,
			createdAt: true,
			languages: {
				where: {
					codeAmountInBytes: {
						gte: Number(
							(projectLanguageAggregate._sum.codeAmountInBytes! * 0.01).toFixed(0)
						),
					},
				},
			},
			commits: true,
			tags: true,
		},
	});

	return {
		props: {
			// 🤔
			project: JSON.parse(JSON.stringify(project)) as typeof project,
			latestCommitsView: JSON.parse(
				JSON.stringify(
					project
						? ProjectCommitService.getLatestCommitsView(project)
						: {
								latestCommitDate: new Date(),
								firstCommitDate: new Date(),
								commitsGroupedByDate: [],
						  }
				)
			) as LatestCommitsView,
		} satisfies {
			project: Project | null;
			latestCommitsView: LatestCommitsView;
		},
	};
}

type ProjectDetailsProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

function ProjectDetails({ project, latestCommitsView }: ProjectDetailsProps) {
	useBreadcrumb([
		{
			isHome: true,
		},
		{
			href: "/project",
			children: "projects",
		},
		{
			isCurrentPage: true,
			children: project?.name || "Not found",
		},
	]);

	if (!project) return <div>no project found</div>;

	const getPercentageAmountOfLanguage = (amountInBytes: number, totalAmountInBytes: number) => {
		return Number(amountInBytes / totalAmountInBytes).toLocaleString(undefined, {
			style: "percent",
			minimumFractionDigits: 1,
		});
	};

	const totalLanguageAmountInBytes = project.languages.reduce(
		(totalAmount, language) => (totalAmount += language.codeAmountInBytes),
		0
	);

	const documentTitle = `Project: ${project.alias}`;
	return (
		<>
			<Head>
				<title>{documentTitle}</title>
				<meta
					name="description"
					content={`Detailed overview of the "${project.alias}"-project`}
				/>
				<meta name="keywords" content={`${documentTitle}, David Kimmich`} />
			</Head>
			<LeftHeading
				rightSection={
					<IconLink
						icon={
							<LongArrowRightUp
								className={`inline shrink-0 transition-transform
											group-hover:translate-x-1`}
							/>
						}
						disabled={!project.url}
						href={project.url || "#"}
						target={"_blank"}
					>
						Visit original site
					</IconLink>
				}
			>
				{project.alias}
			</LeftHeading>

			<section className="mt-16 flex flex-col gap-3">
				<h1 className="text-xl font-medium">Description</h1>
				<p className="text-secondary">
					{project.description || "no description available"}
				</p>
			</section>

			<ProjectImage className="mt-16" src={project.imageUrl} width={768} height={413} />

			<section className="mt-16 flex flex-col gap-3">
				<h1 className="flex items-center">
					<span className="text-xl font-medium">Development activity</span>&nbsp;
					<span className="text-secondary text-base">(within past year)</span>
				</h1>
				<ResponsiveContainer width={"100%"} height={100}>
					<LineChart data={latestCommitsView.commitsGroupedByDate}>
						<Line
							dataKey={"commitsCount"}
							type={"monotone"}
							stroke="#0284c7" // fill-sky-600
							strokeWidth={2}
							dot={false}
						/>
						<Tooltip content={<CommitsTooltip />} />
					</LineChart>
				</ResponsiveContainer>
			</section>
			<section className="mt-16 flex flex-col gap-3">
				<h1 className="flex items-center">
					<span className="text-xl font-medium">Languages used</span>
					&nbsp;
					<span className="text-secondary text-base">(in %)</span>
				</h1>
				<ResponsiveContainer width={"100%"} height={300}>
					<BarChart data={project.languages}>
						<Bar className="fill-sky-600" dataKey={"codeAmountInBytes"}>
							<LabelList
								className="fill-secondary text-xs"
								position={"top"}
								formatter={(value) =>
									getPercentageAmountOfLanguage(value, totalLanguageAmountInBytes)
								}
							/>
						</Bar>
						<XAxis dataKey={"name"} interval={0} style={{ fontSize: "10px" }} />
					</BarChart>
				</ResponsiveContainer>
			</section>

			{project.tags.length > 0 && (
				<>
					<section className="flex flex-col gap-3 pt-20 pb-10">
						<h1 className="text-xl font-medium">Tags</h1>
						<ul className="mt-2 flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<li key={tag.name}>
									<Badge>{tag.name}</Badge>
								</li>
							))}
						</ul>
					</section>
				</>
			)}
			<div className="flex justify-center">
				<ImportedFromGithubInfo />
			</div>
		</>
	);
}

export default ProjectDetails;
