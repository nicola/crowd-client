var rm = require('rimraf');

module.exports = function(cb) {
	return rm('./dist', cb);
}