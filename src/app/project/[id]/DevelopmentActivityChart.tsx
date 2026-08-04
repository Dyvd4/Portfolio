import CommitsTooltip from "@components/recharts/Tooltips/CommitsTooltip";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

export default function DevelopmentActivityChart({ latestCommitsView }) {
	return (
		<ResponsiveContainer width={"100%"} height={100}>
			<LineChart data={latestCommitsView.commitsGroupedByDate}>
				<Line
					dataKey={"commitsCount"}
					type={"monotone"}
					stroke="#0284c7" // fill-sky-600
					strokeWidth={2}
					dot={false}
				/>
				{/* @ts-ignore */}
				<Tooltip content={<CommitsTooltip />} />
			</LineChart>
		</ResponsiveContainer>
	);
}
