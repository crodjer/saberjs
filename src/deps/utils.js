'use strict';

var Utils = {},
    ArrayProto = Array.prototype,
    nativeFilter = ArrayProto.filter;

/* Borrowing from underscore.js */
/* TODO: Use lodash instead*/
var each = Utils.each = function each(obj, iterator, context) {
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

var map = Utils.map = function map(obj, iterator, context) {
  var results = [];
  each(obj, function(value, index, list) {
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

var pluck = Utils.pluck = function(obj, key) {
  return map(obj, function(value){ return value[key]; });
};
// Sort the object's values by a criterion produced by an iterator.
Utils.sortBy = function(obj, iterator, context) {
  return pluck(map(obj, function(value, index, list) {
    return {
      value : value,
      index : index,
      criteria : iterator.call(context, value, index, list)
    };
  }).sort(function(left, right) {
    var a = left.criteria;
    var b = right.criteria;
    if (a !== b) {
      if (a > b || a === void 0) {
        return 1;
      }
      if (a < b || b === void 0) {
        return -1;
      }
    }
    return left.index < right.index ? -1 : 1;
  }), 'value');
};

Utils.filter = function(obj, iterator, context) {
  var results = [];
  if (obj === null || obj === undefined) {
    return results;
  }

  if (nativeFilter && obj.filter === nativeFilter) {
    return obj.filter(iterator, context);
  }

  each(obj, function(value, index, list) {
    if (iterator.call(context, value, index, list)) {
      results[results.length] = value;
    }
  });

  return results;
};
/* Done borrowing from underscore.js */
