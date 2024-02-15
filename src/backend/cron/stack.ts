import { Cron, StackContext } from "sst/constructs";

export function CronStack({ stack }: StackContext) {
	const scheduleRate = "rate(1 day)"

	// env-variables need to be explicitly passed here, as the handlers
	// get deployed to separate lambda functions, which have their own env-variables each
	const environment = {
		GH_REPO_OWNER: process.env.GH_REPO_OWNER!,
		GH_API_URL: process.env.GH_API_URL!,
		GH_ACCESS_TOKEN: process.env.GH_ACCESS_TOKEN!,
		DATABASE_URL: process.env.DATABASE_URL!
	}

	new Cron(stack, "Import-repos", {
		schedule: scheduleRate,
		job: {
			function: {
				handler: "./import-repos.handler",
				environment
			}
		},
	});

	new Cron(stack, "Import-projects", {
		schedule: scheduleRate,
		job: {
			function: {
				handler: "./import-projects.handler",
				environment
			}
		},
	});
}