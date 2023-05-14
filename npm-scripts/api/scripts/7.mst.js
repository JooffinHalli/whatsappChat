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

  const handlers = {
    'string': `__str('')__`,
    'integer': `__num(0)__`,
    'boolean': `__bool(false)__`
  }

  const optionalHandlers = {
    'string': `__str_null_undf()__`,
    'integer': `__num_null_undf()__`,
    'boolean': `__bool_null_undf()__`
  }

  const toMst = (schema) => {
    const acc = {};
    const { properties, required = [] } = schema;
    for (const field in properties) {
      const subSchema = properties[field];
      const isRequired = required.includes(field);
      acc[field] = (isRequired ? handlers : optionalHandlers)[subSchema.type];
    }
    return acc;
  }

  const getMstSchemas = (schemas) => {
    const acc = {};
    for (const schemaName in schemas) {
      acc[schemaName] = toMst(schemas[schemaName]);
    }
    return acc;
  }

  fs.mkdir('../../src/mst/schemas', null, () => {});

  const content = validate(apiJson);

  const schemas = getMstSchemas(content.components.schemas);

  for (const schema in schemas) {

    const name = schema.replace('Model', 'Schema');

    const template = Template.content(
      repoLink,
      repoBranch,
      `import { str, num, str_null_undf, num_null_undf, bool_null_undf } from 'mst/utils/types';

export const ${name} = ${toJson(schemas[schema])} as const;`);


    fs.writeFile(`../../src/mst/schemas/${name}.ts`, template, null, () => {});
  }

  const template = Template.content(
    repoLink,
    repoBranch,
    `${Object.keys(schemas).map((schema, i, arr) => {
      const isLast = i === arr.length;
      const name = schema.replace('Model', 'Schema');
      return isLast
        ? `export * from './${name}';`
        : `export * from './${name}';
    `
    }).join('')}`);

  fs.writeFile(`../../src/mst/schemas/index.ts`, template, null, () => {});
}

module.exports = runScript;