'use strict';

describe('data source tests', function () {

  it('should provide DataSource constructor', function () {
    var source = new Saber.DataSource([], {});

    expect(typeof Saber.DataSource).toBe('function');
    expect(typeof source).toBe('object');
  });

  it('should provide exact copy of the source', function () {
    var data = [
      {name: 'Foo', age: 23},
      {name: 'Bar', age: '25'},
      {name: 'FooBar', age: 21},
    ];

    var schema = {
      name: {'type': 'string'},
      age: {'type': 'integer'}
    };

    var source = new Saber.DataSource(data, schema);

    expect(source._data).toBe(data);
    expect(source.parsed.length).toBe(data.length);

    Utils.each(source.parsed, function(entry, index) {
      var testModel = new Model(entry._data, schema);

      expect(data[index]).toEqual(entry._data);
      expect(entry.attributes).toEqual(testModel.attributes);
    });
  });

});
