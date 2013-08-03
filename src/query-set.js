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

  var that = {
  };

  var actions = that.actions = {};
  var addAction = that.addAction = function(name, processor, options) {
    var entries = [];
    options = Utils.extend({}, options);

    var process = function process(models) {
      // This means that the processor itself will need all action
      // entries at once.
      if (options.batchProcessor) {
        models = processor(models, entries);
      } else {
        Utils.each(entries, function(entry) {
          models = processor(models, entry);
        });
      }

      return models;
    };

    actions[name] = {
      process: process,
      options: options
    };

    that[name] = function() {
      entries.push(arguments);
      return that;
    };
  };

  addAction('sort', function sort(models, args) {
    var sortFunction;

    if (typeof args[0] === 'function') {
      sortFunction = args[0];
    } else {
      sortFunction = function (model) {
        return model[args[0]];
      };
    }

    // process sorting;
    return Utils.sortBy(models, sortFunction);
  });

  var actionsExOrder = [
    'sort'
  ];

  that.execute = function execute(callback) {
    // Just give back the source for now, with no
    // errors

    var that = this;

    // Setting error object to be null currently
    source.process(null, function (err, models) {
      Utils.each(actionsExOrder, function (actionName) {
        var action = actions[actionName];
        models = action.process(models);
      });

      callback.call(that, err, models);
    });
  };

  return that;
};
