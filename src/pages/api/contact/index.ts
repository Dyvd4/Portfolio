import mailTransport from "@backend/MailTransport";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const CONTACT_RECIPIENT = process.env.NEXT_PUBLIC_CONTACT_RECIPIENT!;
const BASE_URL = process.env.BASE_URL!;

export const contactSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email(),
	message: z.string().nonempty(),
	services: z.array(z.string()).min(1, { message: "You must select at least one service." }),
});
export type ContactSchema = z.infer<typeof contactSchema>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const reqData = await req.body;
	const { name, email, message, services } = reqData;
	try {
		contactSchema.parse({ name, email, message, services });
		await mailTransport.sendMail({
			from: email,
			to: CONTACT_RECIPIENT,
			subject: `Contact request (from ${BASE_URL})`,
			text:
				"Requested services: " +
				"\n" +
				services.map((s) => `- ${s}`).join(`\n`) +
				"\n" +
				"\n" +
				message,
		});
		return res.json("Success");
	} catch (e) {
		if (e instanceof z.ZodError) {
			return res.status(400).json((e as z.ZodError).format());
		}
		console.error(e);
		return res.status(500).json("An unknown error occurred sending the mail");
	}
}
