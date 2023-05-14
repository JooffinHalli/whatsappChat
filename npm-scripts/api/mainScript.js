const fs = require('fs');
const { execSync } = require('child_process');
const { OpenApiJsonifier } = require('../../packages');

const genOpenapi = require('./scripts/1.openapi');
const genPaths = require('./scripts/2.paths');
const genComponents = require('./scripts/3.components');
const genSchemas = require('./scripts/4.schemas');
const genTypes = require('./scripts/5.types');
const genMst = require('./scripts/7.mst');

const lib = {
  isObj: (x) => (typeof x === 'object') && (x !== null),
  toJson: (obj) => {
    return JSON.stringify(obj, null, 2)
      .replaceAll(/(")(\w*)(")(:)/g, (match, p1, p2) => `${p2}:`)
      .replaceAll(/(")/g, "'")
      .replaceAll(/('__)(.*)(__')/g, (match, p1, p2) => p2);
  },
  ignoredFields: {
    'summary': true,
    'description': true,
    'tags': true,
    'title': true,
    'example': true,
    'format': true
  }
}

const runScript = (repoLink, repoBranch, withMst) => {

  if (!repoLink) {
    end('укажите ссылку на репозиторий');
  }

  if (!repoLink.startsWith('http')) {
    end('укажите корректную ссылку на репозиторий');
  }

  const repoLinkDotParts = repoLink.split('.');

  if (repoLinkDotParts[repoLinkDotParts.length - 1] !== 'git') {
    end('укажите корректную ссылку на репозиторий');
  }

  const repoLinkSlashParts = repoLinkDotParts[repoLinkDotParts.length - 2].split('/');

  const repoName = repoLinkSlashParts[repoLinkSlashParts.length - 1];

  const removeRepoFolder = (dir = repoName) => {
    try {
      if (!fs.existsSync(dir)) return;
      fs.rmSync(dir, { recursive: true, force: true });
    }
    catch(e) {
      end(e.message);
    }
  }

  removeRepoFolder();

  fs.mkdir('../../src/api/openApi', null, () => {});

  try {
    console.log(`Clonning repository ${repoName}...`);
    // execSync(`git clone --depth=1 ${repoBranch ? `--branch ${repoBranch} --single-branch ` : ''}${repoLink}`);
    console.log('Cloned');
  }
  catch (e) {
    end('Ошибка во время клонирования репозитория', e.message);
  }

  // const from = `./${repoName}/api.yaml`;
  const from = '../../api.yaml';

  if (!fs.existsSync(from)) {
    end('Репозиторий склонировался с ошибкой или не склонировался вообще');
  }

  try {
    const ctx = { ...lib, repoLink, repoBranch };

    genOpenapi.call(ctx);

    fs.readFile(from, null, (err, yamlContent) => {
      if (err) end('ошибка во время чтения файла', err);

      const beforeScripts = [
        genPaths.bind(ctx),
        genComponents.bind(ctx),
        genSchemas.bind(ctx)
      ];

      if (withMst) {
        beforeScripts.push(genMst.bind(ctx));
      }

      new OpenApiJsonifier(yamlContent, {
        beforeScripts,
        afterScripts: [
          genTypes.bind(ctx)
        ]
      });
    });
  }
  catch (e) {
    end(`Ошибка во время парсинга ${from}`, e.message);
  }
  finally {
    removeRepoFolder();
  }

}

function end(...args) {
  console.log('\x1b[31m%s\x1b[0m', ...args); // red
  process.exit(0);
}

module.exports = runScript;