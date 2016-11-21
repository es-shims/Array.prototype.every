var every = require('../implementation');
var bind = require('function-bind');
var test = require('tape');
var runTests = require('./tests');

var hasStrictMode = (function () {
	'use strict';
	return !this;
}());

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		st.throws(bind.call(every, null, undefined, 'a'), TypeError, 'undefined is not an object');
		st.throws(bind.call(every, null, null, 'a'), TypeError, 'null is not an object');
		st.end();
	});

	t.test('receiver boxing', function (st) {
		st.plan(hasStrictMode ? 3 : 2);

		var context = 'x';

		every.call('foo', function () {
			st.equal(typeof this, 'object');
			st.equal(String.prototype.toString.call(this), context);
		}, context);

		st.test('strict mode', { skip: !hasStrictMode }, function (sst) {
			sst.plan(2);

			every.call('foo', function () {
				'use strict';
				sst.equal(typeof this, 'string');
				sst.equal(this, context);
			}, context);
			sst.end();
		});

		st.end();
	});

	runTests(bind.call(Function.call, every), t);

	t.end();
});
