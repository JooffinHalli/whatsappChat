const fs = require('fs');
const { Path, Template } = require('../utils');

function runScript(apiJson) {

  const { repoLink, repoBranch } = this;

  const endpoints = Object.entries(apiJson.paths).reduce((acc, [path, pathObj]) => {
    const endpointName = Path.static(Path.normalize(path));
    acc[endpointName] = Object.keys(pathObj).reduce((methods, method) => {
      methods.push(`'${method}'`);
      return methods;
    }, []);

    return acc;
  }, {});

  const content = JSON.stringify(endpoints, null, 2).replaceAll('"', '');

  const template = Template.content(
    repoLink,
    repoBranch,
    `export const endpoints = ${content} as const;`
  );

  fs.writeFile('../../src/api/endpoints.ts', template, null, () => {});
  
}

module.exports = runScript;