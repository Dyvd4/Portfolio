import nodemailer from "nodemailer";

const SMPT_USERNAME = process.env.SMPT_USERNAME!;
const SMPT_PASSWORD = process.env.SMPT_PASSWORD!;
const SMTP_HOST = process.env.SMTP_HOST!;

const transporter = nodemailer.createTransport({
  pool: true,
  host: SMTP_HOST,
  port: 465,
  auth: {
    user: SMPT_USERNAME,
    pass: SMPT_PASSWORD,
  },
});

export default transporter;
