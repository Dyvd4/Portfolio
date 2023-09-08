import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class PortfolioCronStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const importReposLambda = new NodejsFunction(this, "ImportRepos", {
			runtime: Runtime.NODEJS_16_X,
			entry: "./resources/lambdas/import-repos.ts",
			handler: "handler",
			timeout: Duration.seconds(30),
		});

		const importProjectsLambda = new NodejsFunction(this, "ImportProjects", {
			runtime: Runtime.NODEJS_16_X,
			entry: "./resources/lambdas/import-projects.ts",
			handler: "handler",
			timeout: Duration.seconds(30),
		});

		const onceADayScheduleRule = new Rule(this, "OnceADay", {
			schedule: Schedule.rate(cdk.Duration.hours(24)),
		});

		onceADayScheduleRule.addTarget(new LambdaFunction(importReposLambda));
		onceADayScheduleRule.addTarget(new LambdaFunction(importProjectsLambda));
	}
}
