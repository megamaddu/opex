'use strict';

var pkg = require('./package')
;

function opex() {
  var res = {}, _ = {}, i;
  for (i in arguments) {
    if (arguments.hasOwnProperty(i)) {
      extend.call({ depth: 1 }, res, arguments[i] || _);
    }
  }
  return res;
}

function extend(origin, add) {
  var j, left, right;

  if (this.depth > 99) {
    throw new Error('opex exceeded 99 levels of depth -- most likely a circular reference error');
  }

  for (j in add) {
    if (add.hasOwnProperty(j)) {
      right = add[j];

      if ((typeof right !== 'object' && typeof right !== 'function') || right.__proto__ !== Object.prototype) {
        origin[j] = right;
        continue;
      }

      if (origin.hasOwnProperty(j)) {
        left = origin[j];
      } else {
        origin[j] = left = {};
      }

      this.depth++;
      extend.call(this, left, right);
      this.depth--;
    }
  }
}

opex.version = pkg.version;
module.exports = opex;