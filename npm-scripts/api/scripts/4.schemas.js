const fs = require('fs');
const { Template } = require('../utils');

function runScript(apiJson) {

  const { isObj, toJson, ignoredFields, repoLink, repoBranch } = this;

  const validate = (obj, acc = {}) => {
    for (const k in obj) {

      if (k in ignoredFields) continue;

      const el = obj[k];
  
      if (Array.isArray(el)) {
        acc[k] = [];
        for (const arrEl of el) {
          acc[k].push(isObj(arrEl) ? validate(arrEl) : arrEl);
        }
        continue;
      }
  
      acc[k] = isObj(el) ? validate(el) : el;
  
    }
  
    return acc;
  }

  const content = validate(apiJson);

  const template = Template.content(
    repoLink,
    repoBranch,
    `export const schemas = ${toJson(content.components.schemas)} as const;`
  );

  fs.writeFile('../../src/api/openApi/schemas.ts', template, null, () => {});
}

module.exports = runScript;