import ProjectCommitService from "@backend/services/ProjectCommitService";
import config from "@config/config";
import { prisma } from "@prisma";
import { getImageUrl } from "@utils/file-utils";
import dayjs from "dayjs";
import dayJsIsBetweenPlugin from "dayjs/plugin/isBetween";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailsPage from "./project-details-page";

dayjs.extend(dayJsIsBetweenPlugin);

const { NEXT_PUBLIC_BASE_URL } = config;

type ProjectDetailsProps = {
	params: {
		id: string;
	};
};

export async function generateMetadata({ params: { id } }: ProjectDetailsProps): Promise<Metadata> {
	const project = await prisma.project.findFirst({
		where: {
			id: +id,
		},
		include: {
			images: {
				where: {
					isThumbnail: true,
				},
				include: {
					file: true,
				},
			},
		},
	});

	if (!project) return {};

	return {
		title: `Project: ${project.alias}`,
		description: `Detailed overview of the "${project.alias}"-project`,
		openGraph: {
			images: [getImageUrl(project.images[0].file)],
		},
	};
}

async function ProjectDetails({ params: { id } }: ProjectDetailsProps) {
	if (!id) {
		notFound();
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
			url: true,
			description: true,
			visibility: true,
			updatedAt: true,
			createdAt: true,
			additionalDescription: true,
			languages: {
				where: {
					codeAmountInBytes: {
						gte: Number(
							(projectLanguageAggregate._sum.codeAmountInBytes! * 0.01).toFixed(0)
						),
					},
				},
			},
			images: {
				include: {
					file: true,
				},
			},
			commits: true,
			tags: true,
		},
	});
	return (
		<ProjectDetailsPage
			project={project}
			latestCommitsView={
				project
					? ProjectCommitService.getLatestCommitsView(project)
					: {
							latestCommitDate: new Date(),
							firstCommitDate: new Date(),
							commitsGroupedByDate: [],
						}
			}
		/>
	);
}

export default ProjectDetails;
