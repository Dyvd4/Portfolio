import ProjectCommitService from "@backend/services/ProjectCommitService";
import TooltipWrapper from "@components/recharts/TooltipWrapper";
import Text from "@components/Text";
import { prisma } from "@prisma";
import dayjs from "dayjs";
import dayJsIsBetweenPlugin from "dayjs/plugin/isBetween";
import { NextPageContext } from "next";
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";

dayjs.extend(dayJsIsBetweenPlugin)

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

function CommitsTooltip({ active, payload: payloads }: TooltipProps<number, string>) {

    if (active && payloads && payloads.length) {

        const payload = payloads[0];

        return (
            <TooltipWrapper>
                <div>
                    Date: {dayjs(payload.payload.date).format("DD/MM/YYYY")}
                </div>
                <div>
                    Amount of commits: <b>{payload.value}</b>
                </div>
            </TooltipWrapper>
        )
    }

    return null;
}

function LanguagesTooltip({ active, payload: payloads }: TooltipProps<number, string>) {

    const getPercentageAmountOfLanguage = (amountInBytes: number, totalAmountInBytes: number) => {
        return Number(amountInBytes / totalAmountInBytes).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 1
        });
    }

    if (active && payloads && payloads.length) {

        const payload = payloads[0];
        const nestedPayload = payload.payload;

        return (
            <TooltipWrapper>
                <span>
                    {payload.payload.name}:
                </span>&nbsp;
                <b>
                    {getPercentageAmountOfLanguage(payload.value!, nestedPayload.totalLanguageAmountInBytes)}
                </b>
            </TooltipWrapper>
        )
    }

    return null;
}

type ProjectDetailsProps = Awaited<ReturnType<typeof getServerSideProps>>["props"]

function ProjectDetails({ project }: ProjectDetailsProps) {

    if (!project) return <div>no project found</div>

    const totalLanguageAmountInBytes = project.languages.reduce((totalAmount, language) => totalAmount += language.codeAmountInBytes, 0);
    const mappedLanguages = project.languages.map(language => ({
        totalLanguageAmountInBytes,
        ...language
    }));

    return (
        <div className="max-w-screen-md h-screen bg-white dark:bg-black mx-auto mt-8">
            <Text className="text-center">
                <h1 className='text-7xl font-black'>
                    {project.alias}
                </h1>
                <Text
                    className='my-4 text-center'
                    variant='secondary'>
                    <p>{project.description || "no description available"}</p>
                </Text>
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
                        Languages used
                    </h1>
                    <ResponsiveContainer width={"100%"} height={200}>
                        <PieChart>
                            <Pie
                                outerRadius={80}
                                data={mappedLanguages}
                                dataKey={"codeAmountInBytes"}>
                                {mappedLanguages.map((item, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip content={<LanguagesTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </section>
            </Text>
        </div>
    );
}

export default ProjectDetails;