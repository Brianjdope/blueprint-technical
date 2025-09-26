// infra/lib/repo-creator-stack.js
const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const path = require('path');

class RepoCreatorStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const repoFunction = new lambda.Function(this, 'RepoCreatorFunction', {
      runtime: lambda.Runtime.NODEJS18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../function')),
      environment: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        TARGET_ORG: process.env.TARGET_ORG || 'blueprint-org',
      },
    });

    new apigateway.LambdaRestApi(this, 'RepoCreatorAPI', {
      handler: repoFunction,
      proxy: false,
    });
  }
}

module.exports = { RepoCreatorStack };
