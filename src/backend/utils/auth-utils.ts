import config from "@config/config";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../auth";
import logger from "../../lib/logger";

export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
	const authToken = req.headers["auth-token"]! as string;
	if (authToken == null) return false;

	const session = await auth(req, res);

	let jwtSession: any;
	try {
		jwtSession = jwt.verify(authToken, config.NEXTAUTH_SECRET);
	} catch (err) {
		logger.error(err);
		return false;
	}

	return session != null || jwtSession != null;
};
