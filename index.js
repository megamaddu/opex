'use strict';

var pkg = require('./package');

function extend(origin, add, depth) {
  if (depth > 99) {
    throw new Error('opex exceeded 99 levels of depth -- most likely a circular reference error');
  }
  if (typeof add !== 'object' && typeof add !== 'function') {
    return;
  }
  var keys = Array.prototype.reverse.call(Object.keys(add)),
    i = keys.length,
    key,
    left,
    right;
  while (i--) {
    key = keys[i];
    right = add[key];
    if (right === null || (typeof right !== 'object' && typeof right !== 'function') || Object.getPrototypeOf(right) !== Object.prototype) {
      origin[key] = right;
      continue;
    }
    if (origin.hasOwnProperty(key)) {
      left = origin[key];
    } else {
      origin[key] = left = {};
    }
    extend(left, right, depth + 1);
  }
}

function opex() {
  var res = {},
    _ = {},
    keys = Array.prototype.reverse.call(arguments),
    i = arguments.length;
  while (i--) {
    extend(res, keys[i] || _, 0);
  }
  return res;
}

opex.version = pkg.version;
module.exports = opex;
