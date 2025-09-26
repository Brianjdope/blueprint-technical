const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const { Construct } = require('constructs');

class RepoCreatorStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'RepoCreatorLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',                         // ✅ matches your function file
      code: lambda.Code.fromAsset('../function'),       // ✅ your Lambda folder
      environment: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,         // ✅ pull from local env or Secrets Manager
        TARGET_ORG: 'blueprint-technical',
      },
    });

    const api = new apigateway.LambdaRestApi(this, 'RepoCreatorApi', {
      handler: fn,
      proxy: false,
    });

    const create = api.root.addResource('create');
    create.addMethod('POST');

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
    });
  }
}

module.exports = { RepoCreatorStack };
