const { readFileSync } = require('fs');
const { createServer } = require('http');
const { extname } = require('path');
require('dotenv').config({ path: './.env' });

const contentType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json'
};

const renderStatic = (req, res) => {

  const filePath = `./public${req.url === '/' ? '/index.html' : req.url}`;
  
  const ext = extname(filePath);

  try {

    const data = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType[ext] });
    res.end(data, 'utf-8');

  } catch(e) {

    res.writeHead(500);
    res.end(`Error with code ${e.code} occured`);

  }
}

const server = createServer(renderStatic);

server.listen(process.env.APP_LOCAL_PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `Server is started on ${process.env.APP_LOCAL_HOST}...`); //green
});