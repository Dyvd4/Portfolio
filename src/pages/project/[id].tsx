import ProjectCommitService from "@backend/services/ProjectCommitService";
import Button from "@components/Button";
import IconLink from "@components/IconLink";
import CommitsTooltip from "@components/recharts/Tooltips/CommitsTooltip";
import { prisma } from "@prisma";
import dayjs from "dayjs";
import dayJsIsBetweenPlugin from "dayjs/plugin/isBetween";
import { NextPageContext } from "next";
import { Bar, BarChart, LabelList, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

dayjs.extend(dayJsIsBetweenPlugin)

export async function getServerSideProps(context: NextPageContext) {

	const { id } = context.query;

	if (!id) {
		return {
			props: {
				project: null
			}
		}
	}

	const project = await prisma.project.findUnique({
		where: {
			id: parseInt(id as string)
		},
		include: {
			commits: true,
			languages: true,
			tags: true
		}
	})

	if (project) (project.commits as any) = ProjectCommitService.getCommitsGroupedByCreatedAt(project);

	return {
		props: {
			project: JSON.parse(JSON.stringify(project)) as typeof project
		}
	}
}

type ProjectDetailsProps = Awaited<ReturnType<typeof getServerSideProps>>["props"]

function ProjectDetails({ project }: ProjectDetailsProps) {

	if (!project) return <div>no project found</div>

	const getPercentageAmountOfLanguage = (amountInBytes: number, totalAmountInBytes: number) => {
		return Number(amountInBytes / totalAmountInBytes).toLocaleString(undefined, {
			style: "percent",
			minimumFractionDigits: 1
		});
	}

	const totalLanguageAmountInBytes = project.languages.reduce((totalAmount, language) => totalAmount += language.codeAmountInBytes, 0);

	return (
		<>
			<div className="text-center">
				<h1 className='text-7xl font-black'>
					{project.alias}
				</h1>
				<p className='my-8 text-center text-secondary'>{project.description || "no description available"}</p>
			</div>

			<div className="flex justify-center items-center gap-4">
				<Button disabled={!project.url}>
					<IconLink
						disabled={!project.url}
						href={project.url || "#"}
						target={"_blank"}>
						View demo
					</IconLink>
				</Button>
				<Button disabled={!project.githubUrl}>
					<IconLink
						disabled={!project.githubUrl}
						href={project.githubUrl || "#"}
						target={"_blank"}>
						View on GitHub
					</IconLink>
				</Button>
			</div>

			<section className="p-4 mt-20">
				<h1 className='text-xl'>
					Activity within last year
				</h1>
				<ResponsiveContainer width={"100%"} height={100}>
					<LineChart data={project.commits}>
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

			<section className="p-4 mt-16">
				<h1 className='text-xl'>
					Languages used (in %)
				</h1>
				<ResponsiveContainer width={"100%"} height={250}>
					<BarChart data={project.languages}>
						<Bar className="fill-sky-600" dataKey={"codeAmountInBytes"}>
							<LabelList
								className="fill-secondary"
								position={"top"}
								formatter={(value) => getPercentageAmountOfLanguage(value, totalLanguageAmountInBytes)}
							/>
						</Bar>
						<XAxis dataKey={"name"} />
					</BarChart>
				</ResponsiveContainer>
			</section>
		</>
	);
}

export default ProjectDetails;