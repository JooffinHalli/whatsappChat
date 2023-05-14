const fs = require('fs');
const { Template } = require('../utils');

function runScript(apiJson) {

  const { isObj, toJson, ignoredFields, repoLink, repoBranch } = this;

  const validate = (obj, acc = {}) => {
    for (const k in obj) {

      if (k in ignoredFields) continue;

      const el = obj[k];
      
      const kIsRef = k === '$ref';
      const elIsRef = el?.toString().startsWith('#/');
      const isSchemaLink = el?.toString().startsWith('#/components/schemas');

      const isSchema = k in apiJson.components.schemas;

      if (isSchema) {
        acc[k] = `__schemas.${k}__`;
        continue;
      }
  
      if (kIsRef && elIsRef) {
        if (isSchemaLink) {
          acc = `__${el
            .replace('#/components/', '')
            .replaceAll(/\//g, '.')}__`
          continue;
        }

        acc = `__${el
          .replace('#/', '')
          .replaceAll(/\//g, '.')}__`
        continue;
      }
  
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

  const template =Template.content(
    repoLink,
    repoBranch,
    `import { schemas } from './schemas';

export const components = ${toJson(content.components)} as const;`);

  fs.writeFile('../../src/api/openApi/components.ts', template, null, () => {});
}

module.exports = runScript;