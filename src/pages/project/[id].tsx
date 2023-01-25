import ProjectCommitService from "@backend/services/ProjectCommitService";
import Button from "@components/Button";
import IconLink from "@components/IconLink";
import CommitsTooltip from "@components/recharts/Tooltips/CommitsTooltip";
import Text from "@components/Text";
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
		<Text className="text-center">
			<h1 className='text-7xl font-black'>
				{project.alias}
			</h1>
			<Text
				className='my-8 text-center'
				variant='secondary'>
				<p>{project.description || "no description available"}</p>
			</Text>
			<div className="flex justify-center items-center gap-4 my-8">
				<Button disabled={!project.url}>
					<IconLink
						href={project.url || "#"}>
						View demo
					</IconLink>
				</Button>
				<Button disabled={!project.githubUrl}>
					<IconLink
						href={project.githubUrl || "#"}
						target={"_blank"}>
						View on GitHub
					</IconLink>
				</Button>
			</div>
			<section className="bg-black text-white p-4">
				<h1 className='text-xl text-center'>
					Activity within last year
				</h1>
				<ResponsiveContainer width={"100%"} height={100}>
					<LineChart data={project.commits}>
						<Line
							dataKey={"commitsCount"}
							type={"monotone"}
							stroke="white"
							strokeWidth={2}
							dot={false}
						/>
						<Tooltip content={<CommitsTooltip />} />
					</LineChart>
				</ResponsiveContainer>
			</section>
			<section className="p-4">
				<h1 className='text-xl text-center'>
					Languages used (in %)
				</h1>
				<ResponsiveContainer width={"100%"} height={250}>
					<BarChart data={project.languages}>
						<Bar
							dataKey={"codeAmountInBytes"}>
							<LabelList
								position={"top"}
								formatter={(value) => getPercentageAmountOfLanguage(value, totalLanguageAmountInBytes)}
							/>
						</Bar>
						<XAxis dataKey={"name"} />
					</BarChart>
				</ResponsiveContainer>
			</section>
		</Text>
	);
}

export default ProjectDetails;