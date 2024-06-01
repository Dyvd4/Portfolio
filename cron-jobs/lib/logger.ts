import winston from "winston";
import { WinstonTransport as AxiomTransport } from "@axiomhq/winston";
import config from "@/config";

const { NODE_ENV, AXIOM_TOKEN, AXIOM_DATASET } = config;

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.metadata({ fillExcept: ["level", "message"] }),
		winston.format.json()
	),
	defaultMeta: {
		service: "cron-jobs",
	},
});

if (NODE_ENV === "production") {
	logger.add(
		new AxiomTransport({
			dataset: AXIOM_DATASET,
			token: AXIOM_TOKEN,
		})
	);
}

if (NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp({ format: "mediumTime" }),
				winston.format.metadata({ fillExcept: ["timestamp", "level", "message"] }),
				winston.format.colorize(),
				winston.format.align(),
				winston.format.printf((info) => {
					let str = `${info.timestamp} ${info.level}: ${info.message}`;
					if (info.metadata) {
						str += `. Metadata: ${JSON.stringify(info.metadata)}`;
					}
					return str;
				})
			),
		})
	);
}

export default logger;
