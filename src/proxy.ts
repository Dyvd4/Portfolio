export { auth as proxy } from "@auth";

export const config = {
	matcher: ["/api/project/:path?", "/api/repos"],
};
