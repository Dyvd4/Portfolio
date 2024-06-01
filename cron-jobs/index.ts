import { handler as importProjects } from "@/jobs/import-projects";
import { handler as importRepos } from "@/jobs/import-repos";
import cron from "node-cron";

cron.schedule("*/10 * * * *", () => {
	importProjects();
});

cron.schedule("*/10 * * * *", () => {
	importRepos();
});
