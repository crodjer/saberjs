'use strict';

var Utils = {};

/* Borrowing from underscore.js */
/* TODO: Use lodash instead*/
Utils.each = function each(obj, iterator, context) {
  if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      iterator.call(context, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(context, obj[key], key, obj);
      }
    }
  }
};

Utils.map = function map(obj, iterator, context) {
  var results = [];
  Utils.each(obj, function(value, index, list) {
    results[results.length] = iterator.call(context, value, index, list);
  });

  return results;
};

Utils.extend = function(obj) {
  Utils.each(Array.prototype.slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

/* Done borrowing from underscore.js */
