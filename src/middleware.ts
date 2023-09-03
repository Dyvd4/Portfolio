export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/api/project/:path*",
		"/api/projects/import",
		"/api/repos/:path*",
		"/api/test/:path*",
	],
};
