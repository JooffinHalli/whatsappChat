const mainScript = require('./mainScript');

const [x, y, ...args] = process.argv;
const [repoLink, repoBranch, mst] = args;

console.time('script took');

mainScript(repoLink, repoBranch, mst === 'mst=true');

console.log('\x1b[32m%s\x1b[0m', 'api успешно обновлено'); // green
console.timeEnd('script took');