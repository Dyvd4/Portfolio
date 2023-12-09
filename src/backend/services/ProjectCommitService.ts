import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

type ProjectPayload = Prisma.ProjectGetPayload<{
	include: { commits: true };
}>;

export const getLatestCommitsView = (project: ProjectPayload) => {
	const groupedCommits = project.commits
		.reduce(
			(result, commit) => {
				const commitDate = dayjs(commit.createDate).startOf("day").toISOString();
				const existingGroup = result.find((g) => g.date === commitDate);
				if (!existingGroup) {
					result.push({
						date: commitDate,
						commitsCount: 1,
					});
				} else {
					existingGroup.commitsCount++;
				}
				return result;
			},
			[] as { date: string; commitsCount: number }[]
		)
		.sort((a, b) => {
			return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1;
		});

	return {
		firstCommitDate: groupedCommits[0]?.date || dayjs().toDate(),
		latestCommitDate: groupedCommits[groupedCommits.length - 1]?.date || dayjs().toDate(),
		commitsGroupedByDate: groupedCommits,
	};
};

export type LatestCommitsView = ReturnType<typeof getLatestCommitsView>;

const ProjectCommitService = {
	getLatestCommitsView,
};

export default ProjectCommitService;
