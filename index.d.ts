import { Probot } from "probot";
import { ApplicationFunction } from "probot/lib/types";

export * from "probot";

export function createLambdaFunction(
  app: ApplicationFunction,
  options: { probot: Probot }
);
