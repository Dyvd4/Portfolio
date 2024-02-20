import { Cron, StackContext } from "sst/constructs";

export function CronStack({ stack }: StackContext) {
	const scheduleRate = "rate(1 day)"

	// env-variables need to be explicitly passed here, as the handlers
	// get deployed to separate lambda functions, which have their own env-variables each
	const environment = {
		API_BASE_URL: process.env.API_BASE_URL!,
		ADMIN_USERNAME: process.env.ADMIN_USERNAME!,
		ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
	}

	new Cron(stack, "Import-repos", {
		schedule: scheduleRate,
		job: {
			function: {
				handler: "src/backend/cron/import-repos.handler",
				environment,
				timeout: "1 minute"
			}
		},
	});

	new Cron(stack, "Import-projects", {
		schedule: scheduleRate,
		job: {
			function: {
				handler: "src/backend/cron/import-projects.handler",
				environment,
				timeout: "1 minute"
			}
		},
	});
}