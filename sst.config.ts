import { CronStack } from "@backend/cron/stack";
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
				environment: {
					ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
					ADMIN_USERNAME: process.env.ADMIN_USERNAME!,
					BASE_URL: process.env.BASE_URL!,
					DATABASE_URL: process.env.DATABASE_URL!,
					GH_ACCESS_TOKEN: process.env.GH_ACCESS_TOKEN!,
					GH_API_URL: process.env.GH_API_URL!,
					GH_REPO_OWNER: process.env.GH_REPO_OWNER!,
					NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
					NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
					NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
					NEXT_PUBLIC_CONTACT_RECIPIENT: process.env.NEXT_PUBLIC_CONTACT_RECIPIENT!,
					NEXT_PUBLIC_GITHUB_PROFILE_URL: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL!,
					NEXT_PUBLIC_LINKEDIN_PROFILE_URL: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL!,
					SMPT_PASSWORD: process.env.SMPT_PASSWORD!,
					SMPT_USERNAME: process.env.SMPT_USERNAME!,
					SMTP_HOST: process.env.SMTP_HOST!,
					DOMAIN_NAME: process.env.DOMAIN_NAME!,
					CERT_ARN: process.env.CERT_ARN!,
				},
				timeout: "1 minute"
			});

			stack.addOutputs({
				SiteUrl: site.customDomainUrl || site.url,
			});
		});

		app.stack(CronStack)
	}
} satisfies SSTConfig;
