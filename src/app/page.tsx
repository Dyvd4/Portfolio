import { prisma } from "@prisma";
import LandingPage from "./landing-page";

export default async function Page() {
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
	return <LandingPage latestProject={latestProject} />;
}