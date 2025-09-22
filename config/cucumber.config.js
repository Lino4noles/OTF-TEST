const path = require('path');

module.exports = {
  default: {
    requireModule: ['ts-node/register'],  // Allow TypeScript step definitions
    require: [
      'step-definitions/**/*.ts',
      'constant/**/*.ts',
      'features/**/*.ts'
    ],
    format: [
      'progress',
      `json:${path.resolve('reports/cucumber_report.json')}`,
      `node_modules/browserstack-node-sdk/src/bin/cucumber-js/formatter/custom_formatter.js`
    ],
    strict: true,
    parallel: 1
  }
};
