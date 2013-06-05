'use strict';

Saber.DataSource = function DataSource (data, schema) {
  var parsed = Utils.map(data, function (entry) {
    return new Model(entry, schema);
  });

  var that = {
    _data: data,
    parsed: parsed
  };

  return that;
};
