import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
	config(_input) {
		return {
			name: "portfolio",
			region: "eu-central-1",
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const certArn = process.env.CERT_ARN!;
			const site = new NextjsSite(stack, "site", {
				customDomain: {
					domainName: process.env.DOMAIN_NAME!,
					isExternalDomain: true,
					cdk: {
						certificate: Certificate.fromCertificateArn(stack, "MyCert", certArn),
					}
				},
				memorySize: "2048 MB",
			});

			stack.addOutputs({
				SiteUrl: site.customDomainUrl || site.url,
			});
		});
	},
} satisfies SSTConfig;
