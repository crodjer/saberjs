'use strict';

Saber.QuerySet = function QuerySet(source) {

  /* Implement chainable functions which can be used to build the query
     - sort
     - where
     - limit
     - offset
     - group
     - aggregate
     - having
   */

  var execute = function execute(callback) {
    // Just give back the source for now, with no
    // errors

    var that = this;

    // Setting error object to be null currently
    source.process(null, function (err, models) {
      callback.call(that, err, models);
    });
  };

  var that = {
    execute: execute
  };

  return that;
};
