'use strict';

var define = require('define-properties');
var RequireObjectCoercible = require('es-abstract/2019/RequireObjectCoercible');
var callBound = require('es-abstract/helpers/callBound');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');

var $slice = callBound('Array.prototype.slice');

// eslint-disable-next-line no-unused-vars
var boundEveryShim = function every(array, callbackfn) {
	RequireObjectCoercible(array);
	return polyfill.apply(array, $slice(arguments, 1));
};
define(boundEveryShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundEveryShim;
