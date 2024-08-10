import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";

export default function LanguagesUsedChart({ project }) {
	const getPercentageAmountOfLanguage = (amountInBytes: number, totalAmountInBytes: number) => {
		return Number(amountInBytes / totalAmountInBytes).toLocaleString(undefined, {
			style: "percent",
			minimumFractionDigits: 1,
		});
	};

	const totalLanguageAmountInBytes = project.languages.reduce(
		(totalAmount, language) => (totalAmount += language.codeAmountInBytes),
		0
	);
	const languages = (project.languages as any[]).toSorted(
		(a, b) => a.codeAmountInBytes - b.codeAmountInBytes
	);
	return (
		<ResponsiveContainer width={"100%"} height={300}>
			<BarChart data={languages}>
				<Bar className="fill-sky-600" dataKey={"codeAmountInBytes"}>
					<LabelList
						className="fill-secondary text-xs"
						position={"top"}
						formatter={(value) =>
							getPercentageAmountOfLanguage(value, totalLanguageAmountInBytes)
						}
					/>
				</Bar>
				<XAxis dataKey={"name"} interval={0} style={{ fontSize: "10px" }} />
			</BarChart>
		</ResponsiveContainer>
	);
}
