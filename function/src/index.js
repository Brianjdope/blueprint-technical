// function/index.js

const { Octokit } = require("@octokit/rest");

exports.handler = async (event) => {
  const repoName = event.queryStringParameters?.repo;

  if (!repoName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'repo' parameter" }),
    };
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    const org = process.env.TARGET_ORG || "blueprint-org";

    const octokit = new Octokit({ auth: token });

    const response = await octokit.rest.repos.createInOrg({
      org,
      name: repoName,
      private: true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: response.data.html_url }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
