# Intro
If you want to Deploy [Probot](https://probot.github.io/docs/deployment/) application function in [Aliyun FC](https://help.aliyun.com/product/50980.html) using the [Serverless Devs](https://github.com/Serverless-Devs/Serverless-Devs)。this package will help you

## Usage

```shell
npm install @serverless-devs/probot-fc-serverless
```

```javascript
// handler.js
const {
  createFcFunction,
  createProbot,
} = require("@serverless-devs/probot-fc-serverless");
const appFn = require("./app");
exports.webhook = createFcFunction(app, { probot: createProbot() });
```

## Configuration

You need to add [environment variables to configure Probot](https://probot.github.io/docs/configuration/) to your Lambda function. If you use the [Serverless App](https://app.serverless.com/), you can add parameters for `APP_ID`, `PRIVATE_KEY`, `WEBHOOK_SECRET`, the use these parameters in `s.yaml`.

```yml
edition: 1.0.0
name: fcDeployApp
access: "default"

services:
  fc-deploy-service-demo:
    component: devsapp/fc
    props:
      region: cn-hangzhou
      service:
        name: fc-deploy-service
        description: "deploy Github App with probot"
        internetAccess: true
      function:
        environmentVariables:
          APP_ID: ${env.APP_ID}
          WEBHOOK_SECRET: ${env.WEBHOOK_SECRET}
          PRIVATE_KEY: ${env.PRIVATE_KEY}
        name: github-app
        description: this is a test
        runtime: nodejs12
        codeUri: ./
        handler: handler.webhook
        memorySize: 128
        timeout: 60
      triggers:
        - name: httpTrigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
              - POST
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /api/github/webhooks
              methods:
                - GET
                - POST
```

Make sure to configure your GitHub App registration's webhook URL to `<your FC's URL>/api/github/webhooks`.


## Example
[example-probot-fc-serverless](https://github.com/Serverless-Devs/probot-aliyun-fc-serverless/example) - Official example application that is continuously deployed to Aliyun FC


## Common errors

| Http Code | Message                      | Description                                                                                        |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------- |
| 403       | Missing Authentication Token | Bad endpoint (this one is not binded on FC)                                                    |
| 500       | Internal server error        | Incorrect headers value (`X-GitHub-Delivery`, `X-GitHub-Event`, `X-Hub-Signature`) or Probot error |

## LICENSE

[ISC](LICENSE)
