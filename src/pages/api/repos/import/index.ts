import GitHubRepoService from "@backend/services/GitHubRepoService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await GitHubRepoService.fetchRepos();
	res.json("Successfully imported repos from GitHub");
}
