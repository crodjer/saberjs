'use strict';

/*jshint unused:false*/
function Model(data, schema) {
  /*jshint unused:true*/

  var attributes = {};
  var fields = Utils.map(schema, function (typeData, name){
    var field = new Fields[typeData.type](name, data[name], typeData);
    attributes[name] = field.parse();
    return field;
  });

  function get(key) {
    return attributes[key];
  }

  return {
    _data: data,
    fields: fields,
    attributes: attributes,
    get: get
  };
}
