import { Project, ProjectCommit } from "@prisma/client";
import dayjs from "dayjs";

export const getCommitsGroupedByCreatedAt = (project: Project & { commits: ProjectCommit[] }) => {
    const groupedCommits = project.commits.sort((a, b) => {
        return dayjs(a.createDate).isBefore(dayjs(b.createDate))
            ? -1
            : 1
    }).filter((commit, index, self) => {
        return dayjs(commit.createDate).isAfter(dayjs().subtract(1, "year")) &&
            self.findIndex(c => dayjs(c.createDate).isSame(dayjs(commit.createDate), "day")) === index
    }).map((commit) => {
        return {
            date: commit.createDate,
            commitsCount: project.commits.filter(c => {
                return dayjs(c.createDate).isSame(dayjs(commit.createDate), "day")
            }).length
        }
    });

    return groupedCommits;
}

const ProjectCommitService = {
    getCommitsGroupedByCreatedAt
}

export default ProjectCommitService