var Currency = function(exchange) {
	this.exchange = exchange;
}

Currency.prototype.toRMB = function(dollar) {
	return dollar * this.exchange;
}

exports.toRMB2 = function(dollar) {
	return dolloar * 6;
}

//module.exports = Currency;
