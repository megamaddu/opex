opex [![Build Status](https://travis-ci.org/spicydonuts/opex.png?branch=master)](http://travis-ci.org/spicydonuts/opex)
====

`opex` (Options Extender) is a tiny, fast extend/mixin function with n-args and functions-as-objects support.

```javascript
var opex = require('opex'),
  defaults = {
    // your defaults
  };

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

# what about deep copy?
  Only where it makes sense.  `opex` is primarily indended to be used with JSON stuctures or a 'flat' object.  Rather than use a flag (or always-on/off) like some implementations, `opex` decides whether to recurse on each property individually.
  Why?  Deep copying can be dangerous.  Best case, it's a little slower.  Worst case?  Non-enumerable properties get left behind while enumerable, this-dependent functions no longer behave as expected.  To avoid these issues while still supporting deep copy for JSON-like structures (e.g. collapsing multiple config files based on application and environment), `opex` will only deep-copy simple objects and object literals.  An object is deemed 'simple' when it's `.__proto__` property is a direct reference to ```Object.prototype```:
```javascript
// which will recurse?
{}                // yes
new Object()      // yes
function x() { }  // no
[]                // no
5                 // no
{ y: [ 'foo' ] }  // yes, but y will not
```
  You get the idea.. sound complicated?  You'll find in most cases it's exactly what you would expect:
```javascript
var opex = require('opex'),
  globalDefaults = {
    env: 'dev',
    log: {
      level: 'debug'
    }
  },
  appDefaults = {
    app: 'bar.com',
    log: {
      level: 'error'
    },
    key: 'bar'
  };

function App(options) {
  // options = {
  //   env: 'prod',
  //   signer: <Crypto.Signer instance>,
  //   customModule: <some custom utility>
  // }
  options = opex(globalDefaults, appDefaults, options);
  options.end;          // 'prod'
  options.log.level;    // 'error'
  options.key;          // 'bar'
  options.app;          // 'bar.com'
  options.singer;       // <Crypto.Signer instance> (non-deep copy)
  options.customModule; // <some custom utility> (non-deep copy)
}
```
  
# install

```
npm install opex
```

# test

```
npm install -g grunt-cli
npm test