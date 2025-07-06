const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end('Todo app will be here soon');
});

server.listen(port, () => {
  console.log(`Server started in port ${port}`);
});