opex [![Build Status](https://travis-ci.org/spicydonuts/opex.png?branch=master)](http://travis-ci.org/spicydonuts/opex)
====

`opex` (Option Extender) is a tiny, fast extend/mixin function with n-args and functions-as-objects support.

```javascript
var opex = require('opex')
, defaults = {
  // your defaults
}
;

function example(options) {
  options = opex(defaults, options);
  // your code
}
```
* `opex` always returns a new object -- no more of those extra curly braces just to keep your shared defaults from changing: ```extend({}, defaults, options)```
* params are collapsed from left to right into the new object; right-most values override any to the left
* non-object and non-function parameters are ignored, which allows for simple input sanitizing

  consider:
```javascript
var defaults = {};
function example(a, b, c) {
  var options = opex(defaults, a, b, c);
}
```
  `options` will always be an object and `opex` will extend a new object with `defaults` and `b` even if `a` is `null` and `c` is an integer.  It will also work if any parameter is a function which has had additional properties assigned to it, i.e. when a module wants to export a function but appends some helper data or functions to the exported function.

# install

```
npm install opex
```
