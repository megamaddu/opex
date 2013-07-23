'use strict';

module.exports = function opex() {
  var res = {}, _ = {};
  for (var i in arguments) {
    extend(res, arguments[i] || _);
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