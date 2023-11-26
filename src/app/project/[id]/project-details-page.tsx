"use client";
import Badge from "@components/Badge";
import LeftHeading from "@components/Headings/LeftHeading";
import IconLink from "@components/IconLink";
import LongArrowRightUp from "@components/Icons/LongArrowRightUp";
import ProjectImage from "@components/Images/ProjectImage";
import ImportedFromGithubInfo from "@components/ImportedFromGithubInfo";
import CommitsTooltip from "@components/recharts/Tooltips/CommitsTooltip";
import ProjectSection from "@components/Sections/ProjectSection/ProjectSection";
import ProjectSectionBody from "@components/Sections/ProjectSection/ProjectSectionBody";
import ProjectSectionHeading from "@components/Sections/ProjectSection/ProjectSectionHeading";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
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

export default function ProjectDetailsPage({ project, latestCommitsView }) {
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

	return (
		<>
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

			<ProjectSection className="mt-16">
				<ProjectSectionHeading>Description</ProjectSectionHeading>
				<ProjectSectionBody>
					{project.description || "no description available"}
				</ProjectSectionBody>
			</ProjectSection>

			<ProjectImage className="mt-16" src={project.imageUrl} width={768} height={413} />

			<ProjectSection className="mt-16">
				<ProjectSectionHeading>Intention</ProjectSectionHeading>
				<ProjectSectionBody>{project.additionalDescription || "-"}</ProjectSectionBody>
			</ProjectSection>

			<ProjectSection className="mt-16">
				<ProjectSectionHeading className="flex items-center justify-between">
					<>
						<div className="flex items-center">
							<span className="text-lg font-medium sm:text-xl">
								Development activity
							</span>
						</div>
						<ImportedFromGithubInfo className="hidden sm:flex" />
					</>
				</ProjectSectionHeading>
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
			</ProjectSection>

			<ProjectSection className="mt-16">
				<ProjectSectionHeading className="flex items-center justify-between">
					<>
						<div className="flex items-center">
							<span className="font-medium">Languages used</span>
							&nbsp;
							<span className="text-secondary text-sm font-normal sm:text-base">
								(in %)
							</span>
						</div>
						<ImportedFromGithubInfo className="hidden sm:flex" />
					</>
				</ProjectSectionHeading>
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
			</ProjectSection>

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
		</>
	);
}
