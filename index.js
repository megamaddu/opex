'use strict';

module.exports = function opex() {
  var res = {}
  for (var i in arguments) {
    extend(res, arguments[i] || {});
  }
  return res;
};

function extend(origin, add) {
  if ('object' === typeof add || 'function' === typeof add) {
    for (var j in add) {
      origin[j] = add[j];
    }
  }
};