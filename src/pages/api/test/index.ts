import { isAuthenticated } from "@backend/utils/auth-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (await isAuthenticated(req, res)) {
		res.send({
			content:
				"This is protected content. You can access this content because you are signed in.",
		});
	} else {
		res.send({
			error: "You must be signed in to view the protected content on this page.",
		});
	}
}
