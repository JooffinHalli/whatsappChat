const yaml = require('js-yaml');

/**
 * converts yaml to json, including handling references ($ref)
 */
class OpenApiJSONifier {

  constructor(yamlContent, options = {}) {
    const _options = {
      beforeScripts: [],
      afterScripts: [],
      parser: yaml.load,
      ...options
    }
    const { parser, beforeScripts, afterScripts } = _options;
    this.#original = parser(yamlContent);
    beforeScripts.forEach((script) => {
      script(this.#original);
    });
    const value = this.#validate(this.#original);
    this.json = JSON.stringify(value, null, 2);
    afterScripts.forEach((script) => {
      script(value);
    });
  }

  json = '';
  paths = null;
  components = null;

  #original = {};

  #isObj = (x) => (typeof x === 'object') && (x !== null);

  #validate(obj, acc = {}) {
    for (const k in obj) {

      const el = obj[k];
      
      const kIsRef = k === '$ref';
      const elIsRef = el?.toString().startsWith('#');
  
      if (kIsRef && elIsRef) {
        const [hash, components, field, scopeObj] = el?.toString().split('/');
        const refValue = this.#original[components][field][scopeObj];
        acc = this.#isObj(refValue) ? this.#validate(refValue) : refValue;
        continue;
      }
  
      if (Array.isArray(el)) {
        acc[k] = [];
        for (const arrEl of el) {
          acc[k].push(this.#isObj(arrEl) ? this.#validate(arrEl) : arrEl);
        }
        continue;
      }
  
      acc[k] = this.#isObj(el) ? this.#validate(el) : el;
  
    }
  
    return acc;
  }

}

module.exports = OpenApiJSONifier;