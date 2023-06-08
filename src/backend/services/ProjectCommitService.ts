import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

type ProjectPayload = Prisma.ProjectGetPayload<{
	include: { commits: true }
}>

export const getLatestCommitsView = (project: ProjectPayload) => {
	const groupedCommits = project.commits.sort((a, b) => {
		return dayjs(b.createDate).isBefore(dayjs(a.createDate))
			? -1
			: 1
	}).filter((commit, index, self) => {
		return self.findIndex(c => dayjs(c.createDate).isSame(dayjs(commit.createDate), "day")) === index &&
			dayjs(commit.createDate).isAfter(dayjs().subtract(1, "year"));
	}).map((commit) => {
		return {
			date: commit.createDate,
			commitsCount: project.commits.filter(c => {
				return dayjs(c.createDate).isSame(dayjs(commit.createDate), "day")
			}).length
		}
	}).sort((a, b) => {
		return dayjs(a.date).isBefore(dayjs(b.date))
			? -1
			: 1
	})

	return {
		firstCommitDate: groupedCommits[0]?.date || dayjs().toDate(),
		latestCommitDate: groupedCommits[groupedCommits.length - 1]?.date || dayjs().toDate(),
		commitsGroupedByDate: groupedCommits
	};
}

export type LatestCommitsView = ReturnType<typeof getLatestCommitsView>

const ProjectCommitService = {
	getLatestCommitsView
}

export default ProjectCommitService