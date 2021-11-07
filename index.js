const ProbotExports = require("probot");
const fcFunction = require("./fc-function");

module.exports = { ...ProbotExports, createFcFunction };

/**
 *
 * @param {import('probot').ApplicationFunction} app
 * @param { { probot: import('probot').Probot } } options
 */
function createFcFunction(app, { probot }) {
  // load app once outside of the function to prevent double
  // event handlers in case of container reuse
  probot.load(app);

  return fcFunction.bind(null, probot);
}
