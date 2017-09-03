const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// 等在這邊等待使用者的要求
const server = http.createServer((req, res) => {
  res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');    //送純文字，也可以送html
//   res.end('Hello World\n');

    res.setHeader('Content-Type', 'text/html');    //改送以下html,就變粗體字了
    res.end('<b>Hello</b> World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});