import { Cron, StackContext } from "sst/constructs";

export function CronStack({ stack }: StackContext) {
	const scheduleRate = "rate(1 day)"
	new Cron(stack, "Import-repos", {
		schedule: scheduleRate,
		job: "./import-repos.ts",
	});
	new Cron(stack, "Import-projects", {
		schedule: scheduleRate,
		job: "./import-projects.ts",
	});
}