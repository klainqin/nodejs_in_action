var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;

console.log(root);

/*
var server1 = http.createServer(function(req, res) {
  var url = parse(req.url);
  var path = join(root, url.pathname);
  console.log(path);
  var stream = fs.createReadStream(path);
  
  stream.on('data', function(chunk){
    res.write(chunk);
  });
  
  stream.on('end', function(){
    res.end();
  }); 
});
*/

var server2 = http.createServer(function(req, res) {
  var url = parse(req.url);
  var path = join(root, url.pathname);
  console.log(path);
  fs.stat(path, function(err, stat){
    if (err) {
      if ('ENOENT' == err.code) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    } else {
      res.setHeader('Content-Length', stat.size);
      var stream = fs.createReadStream(path);
      stream.pipe(res);
      stream.on('error', function(err){
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
	} 
  });
  
});

server2.listen(3000);
