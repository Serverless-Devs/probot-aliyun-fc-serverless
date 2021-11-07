module.exports = fcFunction;

const getRawBody = require("raw-body");

async function fcFunction(probot, req, resp, context) {
  try {
    const body = await getRawBody(req);
    const headers = req.headers;
    await probot.webhooks.verifyAndReceive({
      id: headers["x-github-delivery"],
      name: headers["x-github-event"],
      signature: headers["x-hub-signature-256"] || headers["x-hub-signature"],
      payload: JSON.parse(body.toString()),
    });
    resp.setStatusCode(200);
    resp.send('{"ok":true}');
  } catch (error) {
    resp.setStatusCode(error.status || 500);
    resp.send('{"ok":false}');
  }
}
