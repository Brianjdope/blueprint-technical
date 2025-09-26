#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { RepoCreatorStack } = require('../lib/repo-creator-stack');

// Create a new CDK app
const app = new cdk.App();

// Instantiate your RepoCreatorStack
new RepoCreatorStack(app, 'RepoCreatorStack', {
  // Uncomment and set env if you want to lock deployment region/account
  // env: { 
  //   account: process.env.CDK_DEFAULT_ACCOUNT, 
  //   region: process.env.CDK_DEFAULT_REGION 
  // },
});
