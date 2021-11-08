# Probot & Aliyun FC example

This repository is an example of how to deploy the "Hello, World" of probot apps to [Aliyun FC](https://help.aliyun.com/product/50980.html) using [Serverless Devs](https://github.com/Serverless-Devs/Serverless-Devs).

## Local setup

Install dependencies

```
npm install
```

Start the server

```
npm start
```

Follow the instructions to register a new GitHub app.

## Deployment

In order to deploy the app from you local environment, follow the [Serverless-Devs guide](https://github.com/Serverless-Devs/Serverless-Devs).

Make sure to create the following environmentVariables on [Aliyun FC](https://github.com/devsapp/fc/blob/main/docs/Others/yaml.md#environmentVariables):

```
environmentVariables:
    APP_ID: ${env.APP_ID}
    WEBHOOK_SECRET: ${env.WEBHOOK_SECRET}
    PRIVATE_KEY: ${env.PRIVATE_KEY}
```

and then execute deployment
```
s deploy
```

## License

[ISC](LICENSE)
