"use client";
import Badge from "@components/Badge";
import { Gallery } from "@components/Gallery/Gallery";
import { H2 } from "@components/H2";
import LeftHeading from "@components/Headings/LeftHeading";
import IconLink from "@components/IconLink";
import LongArrowRightUp from "@components/Icons/LongArrowRightUp";
import ImportedFromGithubInfo from "@components/ImportedFromGithubInfo";
import ProjectSection from "@components/Sections/ProjectSection/ProjectSection";
import ProjectSectionBody from "@components/Sections/ProjectSection/ProjectSectionBody";
import ProjectSectionHeading from "@components/Sections/ProjectSection/ProjectSectionHeading";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { getImageUrl } from "@utils/file-utils";
import { Suspense } from "react";
import DevelopmentActivityChart from "./DevelopmentActivityChart";
import LanguagesUsedChart from "./LanguagesUsedChart";

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

	const projectLink = project.url || "#";
	const images = (project.images as any[])
		.toSorted((a, b) => a.sortOrder - b.sortOrder)
		.map(({ file }) => ({ id: file.id, src: getImageUrl(file) }));

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
						href={projectLink}
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

			<Gallery className="mt-16" images={images} />

			<ProjectSection className="mt-16">
				<ProjectSectionHeading>Background info</ProjectSectionHeading>
				<ProjectSectionBody>{project.additionalDescription || "-"}</ProjectSectionBody>
			</ProjectSection>

			<ProjectSection className="mt-16">
				<ProjectSectionHeading className="flex items-center justify-between">
					Development activity
					<ImportedFromGithubInfo className="hidden sm:flex" />
				</ProjectSectionHeading>
				<Suspense fallback="loading...">
					<DevelopmentActivityChart latestCommitsView={latestCommitsView} />
				</Suspense>
			</ProjectSection>

			<ProjectSection className="mt-16">
				<ProjectSectionHeading className="flex items-center justify-between">
					<div className="flex items-center">
						<span>Languages used</span>
						&nbsp;
						<span className="text-secondary text-sm font-normal">(in %)</span>
					</div>
					<ImportedFromGithubInfo className="hidden sm:flex" />
				</ProjectSectionHeading>
				<Suspense fallback="loading...">
					<LanguagesUsedChart project={project} />
				</Suspense>
			</ProjectSection>

			{project.tags.length > 0 && (
				<>
					<section className="flex flex-col gap-3 pt-20">
						<H2>Tags</H2>
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
