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
  if (this.depth > 99) {
    throw new Error('opex exceeded 99 levels of depth -- most likely a circular reference error');
  }
  var j, left, right;
  if ('object' === typeof add || 'function' === typeof add) {
    for (j in add) {
      if (add.hasOwnProperty(j)) {
        right = add[j];
        if ('object' === typeof right || 'function' === typeof right) {
          if (origin.hasOwnProperty(j)) {
            left = origin[j];
          } else {
            left = {};
          }
          this.depth++;
          extend.call(this, left, right);
          origin[j] = left;
          this.depth--;
          continue;
        }
        origin[j] = right;
      }
    }
  }
}

opex.version = pkg.version;
module.exports = opex;