import API from "@/lib/api";
import logger from "@/lib/logger";
import { AxiosError } from "axios";

const RETRY_COUNT = 3;

export const handler = async () => {
	let retries = 0;
	while (retries <= RETRY_COUNT) {
		if (retries > 0) {
			logger.info(`Retrying to import projects: `, retries);
		}
		try {
			const response = await API.get("/projects/import");
			logger.info(response.data);
			break;
		} catch (err) {
			let errorMeta = err;

			if (err instanceof AxiosError) {
				errorMeta = {
					data: err.response?.data,
					status: err.response?.status,
				};
			}

			logger.error("Error trying to import projects.", errorMeta);
			retries++;
		}
	}
};
