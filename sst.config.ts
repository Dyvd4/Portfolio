import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
	config(_input) {
		return {
			name: "Portfolio",
			region: "eu-central-1",
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const site = new NextjsSite(stack, "site", {
				memorySize: "2048 MB"
			});

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
