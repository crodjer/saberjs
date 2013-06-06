'use strict';

Saber.DataSource = function DataSource (data, schema, options) {

  var parsed;

  // Currently unused
  options = Utils.extend({
  }, options);

  var that = {
    _data: data,
    schema: schema
  };

  function parse() {
    return Utils.map(data, function (entry) {
      return new Model(entry, schema);
    });
  }

  that.process = function process(callback) {
    if (!parsed) {
      parsed = parse();
    }

    /* Right now, error object will be null. As we don't have sources
       yet. Possible ones:
       - Network.
       - Invalid Schema.
       - Model not following the schema.
    */
    callback.call(this, null, parsed);
  };

  return that;
};
