import mailTransport from "@backend/MailTransport";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const CONTACT_RECIPIENT = process.env.NEXT_PUBLIC_CONTACT_RECIPIENT!;
const BASE_URL = process.env.BASE_URL!;

export const contactSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email(),
	message: z.string().nonempty(),
});
export type ContactSchema = z.infer<typeof contactSchema>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const reqData = await req.body;
	const { name, email, message } = reqData;
	try {
		contactSchema.parse({ name, email, message });
		await mailTransport.sendMail({
			from: email,
			to: CONTACT_RECIPIENT,
			subject: `Contact request (from ${BASE_URL})`,
			text: message,
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
