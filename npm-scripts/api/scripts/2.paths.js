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
  
      if (kIsRef && elIsRef) {
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

  const content = toJson(validate(apiJson).paths)
    .replaceAll(/(')(\/)(\w*)(')(:)/g, (match, p1, p2, p3) => `'${p3}':`);

  const template = Template.content(
    repoLink,
    repoBranch,
    `import { components } from './components';

export const paths = ${content} as const;`
  );

  fs.writeFile('../../src/api/openApi/paths.ts', template, null, () => {});
}

module.exports = runScript;