'use strict';

var pkg = require('./package')
;

function opex() {
  var res = {}, _ = {}, i;
  for (i in arguments) {
    extend(res, arguments[i] || _);
  }
  return res;
}

function extend(origin, add) {
  var j;
  if ('object' === typeof add || 'function' === typeof add) {
    for (j in add) {
      if (add.hasOwnProperty(j)) {
        origin[j] = add[j];
      }
    }
  }
}

opex.version = pkg.version;
module.exports = opex;