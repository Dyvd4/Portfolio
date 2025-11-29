import { handler as importProjects } from "@/jobs/import-projects";

importProjects();
// cron.schedule("0 0 * * *", () => {
// 	importProjects();
// });

// cron.schedule("0 0 * * *", () => {
// 	importRepos();
// });
