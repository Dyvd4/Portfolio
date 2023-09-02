import ProjectService from "@backend/services/ProjectService";
import { NextApiRequest, NextApiResponse } from "next";
import config from "@config/config";

const { IMPORT_PROJECTS_CRON_ACCESS_TOKEN } = config;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const IMPORT_PROJECTS_CRON_ACCESS_TOKEN_FROM_REQUEST =
    req.headers.authorization?.split("Bearer ")[1];
  console.log(
    "🚀 ~ file: index.ts:10 ~ handler ~ IMPORT_PROJECTS_CRON_ACCESS_TOKEN_FROM_REQUEST:",
    IMPORT_PROJECTS_CRON_ACCESS_TOKEN_FROM_REQUEST
  );

  if (
    IMPORT_PROJECTS_CRON_ACCESS_TOKEN !==
    IMPORT_PROJECTS_CRON_ACCESS_TOKEN_FROM_REQUEST
  ) {
    res.status(401).json("Not authenticated to trigger import route");
  } else {
    await ProjectService.fetchProjects();
    res.json("Successfully imported repos from GitHub");
  }
}
