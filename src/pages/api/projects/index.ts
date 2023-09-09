import { prisma } from "@prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

export const getLatestProjects = async (projectOrTagname?: string) => {
	const projectIds = (
		await prisma.project.findMany({
			select: {
				id: true,
			},
			where: {
				OR: projectOrTagname
					? [
							{
								name: {
									startsWith: projectOrTagname,
								},
							},
							{
								alias: {
									startsWith: projectOrTagname,
								},
							},
							{
								tags: {
									some: {
										name: {
											startsWith: projectOrTagname,
										},
									},
								},
							},
					  ]
					: undefined,
			},
		})
	).map((project) => project.id);

	const latestCommits = (
		await Promise.all(
			projectIds.map((projectId) => {
				return (async () => {
					const latestCommit = await prisma.projectCommit.findFirst({
						where: {
							projectId,
						},
						select: {
							createdAt: true,
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
					return latestCommit;
				})();
			})
		)
	)
		.filter(Boolean)
		.sort((a, b) => {
			return dayjs(a!.createdAt).isBefore(b!.createdAt) ? 1 : -1;
		});

	const latestProjects = latestCommits.map((commit) => commit!.project);
	return latestProjects;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const projectOrTagname = req.query.projectOrTagname;

	if (projectOrTagname instanceof Array) {
		return res.status(400).json("projectOrTagname must be a string");
	}
	const projects = await getLatestProjects(projectOrTagname);

	res.json(projects);
}
