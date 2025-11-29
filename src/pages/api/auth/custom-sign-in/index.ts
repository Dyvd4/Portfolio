import config from "@config/config";
import { prisma } from "@prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log("🚀 ~ handler ~ req.method:", req.method);
	console.log("🚀 ~ handler ~ req.url:", req.url);
	if (req.method !== "POST") return res.status(400).send(`${req.method} not supported`);
	const { username, password } = req.body;
	const user = await prisma.user.findFirst({
		where: {
			name: username,
		},
	});
	if (!user) return res.status(400).json("No user found with this username");
	const adminUser = {
		username: config.ADMIN_USERNAME,
		password: config.ADMIN_PASSWORD,
	};

	const dbAdminUser = await prisma.user.findUnique({
		where: {
			name: adminUser.username,
		},
	});
	if (!dbAdminUser) return res.status(400).json("There's no admin user yet");

	if (username === adminUser.username && (await bcrypt.compare(password, dbAdminUser.password))) {
		const jwtToken = jwt.sign(
			{
				id: dbAdminUser.id,
				name: dbAdminUser.name,
				email: dbAdminUser.email,
			},
			config.NEXTAUTH_SECRET,
			{
				expiresIn: "10m",
			}
		);
		return res.json(jwtToken);
	} else {
		throw new Error("Wrong credentials. Try again.");
	}
}
