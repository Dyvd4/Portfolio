const config = {
	DATABASE_URL: process.env.DATABASE_URL!,
	GH_ACCESS_TOKEN: process.env.GH_ACCESS_TOKEN!,
	GH_REPO_OWNER: process.env.GH_REPO_OWNER!,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
	ADMIN_USERNAME: process.env.ADMIN_USERNAME!,
	ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
	BASE_URL: process.env.BASE_URL!,
	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
	GH_API_URL: process.env.GH_API_URL!,
	NEXT_PUBLIC_GITHUB_PROFILE_URL: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL!,
	NEXT_PUBLIC_LINKEDIN_PROFILE_URL: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL!,
	NEXT_PUBLIC_CONTACT_RECIPIENT: process.env.NEXT_PUBLIC_CONTACT_RECIPIENT!,
};

export default config;
