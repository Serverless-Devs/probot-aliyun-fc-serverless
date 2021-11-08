module.exports = (app) => {
  app.on(["issues.closed", "issues.reopened"], async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
};
