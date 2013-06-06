'use strict';

describe('data source', function () {

  var fixture = {
    data: [
      {name: 'Foo', age: 23},
      {name: 'Bar', age: '25'},
      {name: 'FooBar', age: 21},
    ],
    expected: [
      {name: 'Foo', age: 23},
      {name: 'Bar', age: 25},
      {name: 'FooBar', age: 21},
    ],
    schema: {
      name: {'type': 'string'},
      age: {'type': 'integer'}
    }
  };

  it('should provide DataSource constructor', function () {
    var source = new Saber.DataSource([], {});

    expect(typeof Saber.DataSource).toBe('function');
    expect(typeof source).toBe('object');
  });

  it('should provide exact copy of the source', function () {

    var source = new Saber.DataSource(fixture.data, fixture.schema);

    expect(source._data).toBe(fixture.data);

    source.process(function (err, parsed) {
      expect(parsed.length).toBe(fixture.data.length);

      Utils.each(parsed, function(entry, index) {
        expect(fixture.data[index]).toEqual(entry._data);
        expect(entry.attributes).toEqual(fixture.expected[index]);
      });
    });
  });

  it('should provide a way to get attribute values', function () {
    var source = new Saber.DataSource(fixture.data, fixture.schema);

    source.process(function (err, parsed) {
      Utils.each(parsed, function(model, index) {
        Utils.each(fixture.data, function (value, key) {
          expect(model.get(key)).toEqual(fixture.expected[index][key]);
        });
      });
    });
  });

});
