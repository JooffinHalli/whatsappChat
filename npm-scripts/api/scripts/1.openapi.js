const fs = require('fs');
const { Template } = require('../utils');

function runScript() {

  const { repoLink, repoBranch } = this;

  const template = Template.content(
    repoLink,
    repoBranch,
    `import { paths } from './paths';
import { components } from './components';

export const openapi = {
  paths,
  components
} as const;

export * from './types';`);

  fs.writeFile('../../src/api/openApi/index.ts', template, null, () => {});
}

module.exports = runScript;