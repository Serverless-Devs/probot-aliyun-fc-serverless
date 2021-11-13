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

### Notice
probot generate private_key like
```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCsdsdsdRu9tt6Q0wZMo2M6e4aUv8GfTq6EXggPkt1\nqyM2Ko2lZXnTYzDhIovbO98d+20dV6yOHTiFHF/DCx1qjh/G00nOqneFZi6l9q1i\nJP+WeCG7UuAJWu20EvLSK4TxMQkwYWVSfH2qLfzAeJ+9sqwLQJtxrmXAMzrQBUyS\nnqX81aTWbpIbrz0Cx//XiBnIMpVZYcwMxqpjXdpnVzCcHvxcZ94dfdfdfDtA\nRiDhJPUDlsykZWwGNu1JvH7mQNgUYwJ5VNhVNKnQAS2dGc743NGy6q/3c73HPfNm\nAGWe5eUzVDKhrtBIepWxVF10fdfdfwQIDAQABAoIBAHx9Kev+iGTPcQp2\noboEfJcbZLRGS7szC6cMpR21tE9TMo7TzhY3A1mPP8w2VhFzf+uK8Rpym34oq+YK\nHkIpX3VnjQTgmTcW4EO4iGaaBIoRv3+fC/KqzYpgZbFrpFW0J65SN4+uTX3yRD6S\nn64pJaYn/oS+uaPaeLMWN7Bg3qGu/QhRmI/9Tyj+jn0yzKXEBKEVsscIcwpUBt5H\nMVVnUomAQrWmxnvX1bh0LVxJS2/rwo0WD+Ay0RlD/8u/N5myZBrkRVnLmZQrxpv6\nWiBCNrg58KyhIKZUetv7Ndi3T8FCuYE78xiaJE30fFR0uZFTfc78ANYPVjqS3BJX\ng/RM4dECgYEA3XhdhYAx+5iOcvbFqmcGkWAAv+JBP7w1H9L7BFoKAZ9WtdFAkjWZ\nmtmyFNkfH8zI75x/0O7Kr9Y5J9a+VysLmSI61lbBI1+Zu6PNO7y6FtG1l5k6ErCa\nOcEF5iCgyufAlABq/NHQ3n3JcKI1uTBUSH1b3sgrGlCauus3GzC1L6UCgYEAywqQ\nJYscVeg0NwjJZTmXkqFEK7Y1bRe9hm1jU1MQuIPkv0DTBOMbMfKP0RH81eDQbwIt\n+RCmv9atp45j5r09cddjif1GB4jKXbVxB87efCXTeHnX4EkcZoXNKvTVmiYFTyEs\nQQ3VwbC7MG7F38elU1yEmaDetmGIlUB5IdkNEu0CgYEAhZBltnGNs1JZ9nNk2lOv\n3lSrnw1wlGOJFlxDDmjOyBO0U4qTCppQvNa1U2VuI9t5Ayi63OJmUo07gw87U46e\nPAgsu78uU4sAR+2NhI1ZHRH0Fi1OnJ7tJA+I4zSiRDxoI9nsq/RNpyDtL4RkKf8/\nlUgk88J8XC5oYnogjcFeRBECgYBXbP3yXHrf9rL8+3iUcH72cSAEXlmU1sMRreo1\nx6+Mc6Y8P7JdCVj9Yb9RO5iNk1bMZbjb5LKYKdzuJ96WTOe3LBI9KWRM/DZ+sRCx\nVv7vn+31kylD9tcWwgg8td1/mV1x3AvNGyLuWqXPTfM/zxw9z7l82QrspwSDl5ZQ\n37/EZQKBgF8GZDGq52QZgtC4WT9VhqC7mn4HMdfdf3Bxn/aaHQ+ZF6RLu\nZ58TqzXS/mP3f6EJm8N4zJHNhqYyO9xcNnQkqhL30XlPx4ttJofTgGzWKNrYj/g2\nyMQBmzurn0EY+prWHLTWkZO+Ya2tZaAjRDhq4F6MJbtzZBk4TQuL\n-----END RSA PRIVATE KEY-----\n"
```
it will not effect on Aliyun Fc, you should warpper with `'`
```
PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCsdsdsdRu9tt6Q0wZMo2M6e4aUv8GfTq6EXggPkt1\nqyM2Ko2lZXnTYzDhIovbO98d+20dV6yOHTiFHF/DCx1qjh/G00nOqneFZi6l9q1i\nJP+WeCG7UuAJWu20EvLSK4TxMQkwYWVSfH2qLfzAeJ+9sqwLQJtxrmXAMzrQBUyS\nnqX81aTWbpIbrz0Cx//XiBnIMpVZYcwMxqpjXdpnVzCcHvxcZ94dfdfdfDtA\nRiDhJPUDlsykZWwGNu1JvH7mQNgUYwJ5VNhVNKnQAS2dGc743NGy6q/3c73HPfNm\nAGWe5eUzVDKhrtBIepWxVF10fdfdfwQIDAQABAoIBAHx9Kev+iGTPcQp2\noboEfJcbZLRGS7szC6cMpR21tE9TMo7TzhY3A1mPP8w2VhFzf+uK8Rpym34oq+YK\nHkIpX3VnjQTgmTcW4EO4iGaaBIoRv3+fC/KqzYpgZbFrpFW0J65SN4+uTX3yRD6S\nn64pJaYn/oS+uaPaeLMWN7Bg3qGu/QhRmI/9Tyj+jn0yzKXEBKEVsscIcwpUBt5H\nMVVnUomAQrWmxnvX1bh0LVxJS2/rwo0WD+Ay0RlD/8u/N5myZBrkRVnLmZQrxpv6\nWiBCNrg58KyhIKZUetv7Ndi3T8FCuYE78xiaJE30fFR0uZFTfc78ANYPVjqS3BJX\ng/RM4dECgYEA3XhdhYAx+5iOcvbFqmcGkWAAv+JBP7w1H9L7BFoKAZ9WtdFAkjWZ\nmtmyFNkfH8zI75x/0O7Kr9Y5J9a+VysLmSI61lbBI1+Zu6PNO7y6FtG1l5k6ErCa\nOcEF5iCgyufAlABq/NHQ3n3JcKI1uTBUSH1b3sgrGlCauus3GzC1L6UCgYEAywqQ\nJYscVeg0NwjJZTmXkqFEK7Y1bRe9hm1jU1MQuIPkv0DTBOMbMfKP0RH81eDQbwIt\n+RCmv9atp45j5r09cddjif1GB4jKXbVxB87efCXTeHnX4EkcZoXNKvTVmiYFTyEs\nQQ3VwbC7MG7F38elU1yEmaDetmGIlUB5IdkNEu0CgYEAhZBltnGNs1JZ9nNk2lOv\n3lSrnw1wlGOJFlxDDmjOyBO0U4qTCppQvNa1U2VuI9t5Ayi63OJmUo07gw87U46e\nPAgsu78uU4sAR+2NhI1ZHRH0Fi1OnJ7tJA+I4zSiRDxoI9nsq/RNpyDtL4RkKf8/\nlUgk88J8XC5oYnogjcFeRBECgYBXbP3yXHrf9rL8+3iUcH72cSAEXlmU1sMRreo1\nx6+Mc6Y8P7JdCVj9Yb9RO5iNk1bMZbjb5LKYKdzuJ96WTOe3LBI9KWRM/DZ+sRCx\nVv7vn+31kylD9tcWwgg8td1/mV1x3AvNGyLuWqXPTfM/zxw9z7l82QrspwSDl5ZQ\n37/EZQKBgF8GZDGq52QZgtC4WT9VhqC7mn4HMdfdf3Bxn/aaHQ+ZF6RLu\nZ58TqzXS/mP3f6EJm8N4zJHNhqYyO9xcNnQkqhL30XlPx4ttJofTgGzWKNrYj/g2\nyMQBmzurn0EY+prWHLTWkZO+Ya2tZaAjRDhq4F6MJbtzZBk4TQuL\n-----END RSA PRIVATE KEY-----\n'
```


## Example
[example-probot-fc-serverless](https://github.com/Serverless-Devs/probot-aliyun-fc-serverless/tree/master/example) - Official example application that is continuously deployed to Aliyun FC


## Common errors

| Http Code | Message                      | Description                                                                                        |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------- |
| 403       | Missing Authentication Token | Bad endpoint (this one is not binded on FC)                                                    |
| 500       | Internal server error        | Incorrect headers value (`X-GitHub-Delivery`, `X-GitHub-Event`, `X-Hub-Signature`) or Probot error |

## LICENSE

[ISC](LICENSE)
