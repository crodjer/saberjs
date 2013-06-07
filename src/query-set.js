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
  var addAction = that.addAction = function(name, processor) {
    var entries = [];

    actions[name] = {
      processor: processor,
      entries: entries
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

        Utils.each(action.entries, function (entry){
          models = action.processor(models, entry);
        });
      });

      callback.call(that, err, models);
    });
  };

  return that;
};
