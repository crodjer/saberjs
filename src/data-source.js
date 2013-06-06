'use strict';

Saber.DataSource = function DataSource (data, schema, options) {

  var models;

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

  that.process = function process(err, callback) {
    /* Do async processing in future
     */

    if (!models) {
      models = parse();
    }

    callback.call(this, null, models);
  };

  that.query = function query(callback) {

    // Creating a query set for this data source
    var querySet = new Saber.QuerySet(this);
    /* Right now, error object will be null. As we don't have sources
       yet. Possible ones:
       - Network.
       - Invalid Schema.
       - Model not following the schema.
    */
    callback.call(this, null, querySet);
  };

  return that;
};
