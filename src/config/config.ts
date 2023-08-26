const config = {
  DATABASE_URL: process.env.DATABASE_URL!,
  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN!,
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER!,
  IMPORT_PROJECTS_CRON_ACCESS_TOKEN:
    process.env.IMPORT_PROJECTS_CRON_ACCESS_TOKEN!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME!,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
  BASE_URL: process.env.BASE_URL!,
};

export default config;
