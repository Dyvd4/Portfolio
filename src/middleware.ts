export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/api/project/:path?", "/api/repos", "/api/test/:path*"],
};
