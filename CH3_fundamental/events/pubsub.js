var events = require('events')
   ,net = require('net');
   
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
	console.log(id + 'joined\n');
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message) {
		//if (id != senderId) {
			console.log('broadcasting message to' + id + ':' + message);
			channel.clients[id].write(message);
		//}
	}
	this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer(function(client) {
	var id = client.remoteAddress + ':' + client.remotePort;
	client.on('connection', function() { 
		console.log(id + 'joined\n');
		channel.emit('join', id, client);
	});
	client.on('data', function(data) {
		data = data.toString();
		console.log('broadcasting message from' + id + ':' + data);
		channel.emit('broadcast', id, data);
	});
});

server.listen(8888);
