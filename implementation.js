'use strict';

var ES = require('es-abstract/es5');
var bind = require('function-bind');
var isString = require('is-string');

// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var strSplit = bind.call(Function.call, String.prototype.split);

module.exports = function every(callbackfn) {
	var O = ES.ToObject(this);
	var self = splitString && isString(O) ? strSplit(O, '') : O;
	var len = ES.ToUint32(self.length);
	var T;
	if (arguments.length > 1) {
		T = arguments[1];
	}

	// If no callback function or if callback is not a callable function
	if (!ES.IsCallable(callbackfn)) {
		throw new TypeError('Array.prototype.every callback must be a function');
	}

	for (var i = 0; i < len; i++) {
		if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, O) : callbackfn.call(T, self[i], i, O))) {
			return false;
		}
	}
	return true;
};
