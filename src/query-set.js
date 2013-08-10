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

  addAction('filter', function filter(models, entries) {
    function filterFunction (model) {
      var valid = true;

      Utils.each(entries, function (entry) {
        if (!valid) {
          return;
        }

        valid = entry[0](model) || false;
      });

      return valid;
    }

    return Utils.filter(models, filterFunction);
  }, {
    batchProcessor: true
  });

  addAction('where', function filter(models, entries) {
    function filterFunction (model) {
      var valid = true, filter;

      Utils.each(entries, function (entry) {
        if (!valid || typeof entry[0] === 'undefined') {
          valid = false;
          return;
        }

        if (typeof entry[0] === 'object') {
          filter = entry[0];
        } else if (typeof entry[1] !== 'undefined') {
          filter = {};
          filter[entry[0]] = entry[1];
        } else {
          valid = false;
          return;
        }
      });

      for (var key in filter) {
        if (filter.hasOwnProperty(key) && filter[key] !== model[key]) {
          valid = false;
          break;
        }
      }

      return valid;
    }

    return Utils.filter(models, filterFunction);
  }, {
    batchProcessor: true
  });

  var actionsExOrder = [
    'filter',
    'where',
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
