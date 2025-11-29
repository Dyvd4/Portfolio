import dotenv from "dotenv";
dotenv.config();

const config = {
	ADMIN_USERNAME: process.env.ADMIN_USERNAME,
	ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
	NODE_ENV: process.env.NODE_ENV,
	BASE_URL: process.env.BASE_URL!,
	AXIOM_TOKEN: process.env.AXIOM_TOKEN!,
	AXIOM_DATASET: process.env.AXIOM_DATASET!,
	LOG_LEVEL: process.env.LOG_LEVEL!,
};
export default config;
