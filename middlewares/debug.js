function debug(_req, _res, next) {
	console.log("request receive");
	next();
}

module.exports = debug;
