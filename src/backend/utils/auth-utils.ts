import config from "@config/config";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
	const authToken = req.body["auth-token"];
	const session = await getServerSession(req, res, authOptions);
	return !!session || !!jwt.verify(authToken, config.NEXTAUTH_SECRET);
};
