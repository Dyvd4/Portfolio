import dayjs from "dayjs";
import { TooltipContentProps } from "recharts";
import TooltipWrapper from "../TooltipWrapper";

export default function CommitsTooltip({
	active,
	payload: payloads,
}: TooltipContentProps<number, string>) {
	if (active && payloads && payloads.length) {
		const payload = payloads[0];

		return (
			<TooltipWrapper className="dark:text-white">
				<div>Date: {dayjs(payload.payload.date).format("DD/MM/YYYY")}</div>
				<div>
					Amount of commits: <b>{payload.value}</b>
				</div>
			</TooltipWrapper>
		);
	}

	return null;
}
