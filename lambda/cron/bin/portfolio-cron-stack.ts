#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PortfolioCronStack } from "../lib/portfolio-cron-stack";

const app = new cdk.App();
new PortfolioCronStack(app, "PortfolioCronStack");
