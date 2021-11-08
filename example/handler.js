const {
  createFcFunction,
  createProbot,
} = require("@serverless-devs/probot-fc-serverless");
const app = require("./src/index");


exports.webhook = createFcFunction(app, { probot: createProbot() });
