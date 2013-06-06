'use strict';

Saber.DataSource = function DataSource (data, schema, options) {

  // Currently unused
  options = Utils.extend({
  }, options);

  var that = {
    _data: data,
    schema: schema
  };

  /* Parse each of entry through the schema.
   */
  var parse = function parse(callback) {

    var models = Utils.map(data, function (model) {
      var attributes = {};

      Utils.each(schema, function (typeData, name){
        // Get the relevant parser or use the default identity parser
        var parser = Saber.Parser[typeData.type] || Saber.Parser.identity;

        // Store the parsed value in a hash
        attributes[name] = parser(model[name], typeData);
      });

      return attributes;
    });

    callback.call(this, null, models);
  };

  that.process = function process(err, callback) {
    // Do async processing in future

    parse(function(err, models) {
      callback.call(this, null, models);
    });
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
