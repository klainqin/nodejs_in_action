var http = require('http');
var server = http.createServer();
var fs = require('fs');

server.on('request', function (req, res) {
   res.writeHead(200, {'Content-Type': 'image/png'});
   fs.createReadStream('./image.png').pipe(res);
   console.log('a read stream is started.\n');
});

server.on('end', function (req, res) {
   console.log('a read stream is ended.\n');
   res.end('end of hello world\n');
});

/*
var stream = fs.createReadStream('./resource.json');
stream.on('data', function (chunk) {
   console.log(chunk);
   console.log('===');
});

stream.on('end', function () {
  console.log('finished');
});
*/

server.listen(3000);
console.log('server running on http://localhost:3000');
