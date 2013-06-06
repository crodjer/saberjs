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

  it('should give me back a query set', function () {
    var source = new Saber.DataSource(fixture.data, fixture.schema);
    source.query(function (err, querySet) {
      expect(typeof querySet).toBe('object');

      querySet.execute(function (err, models) {
        expect(typeof models.length).toBe('number');
      });
    });
  });

  it('should provide exact copy of the source', function () {
    var source = new Saber.DataSource(fixture.data, fixture.schema);

    expect(source._data).toBe(fixture.data);

    source.query(function (err, querySet) {
      querySet.execute(function (err, models) {
        expect(models.length).toBe(fixture.data.length);

        Utils.each(models, function(model, index) {
          expect(model).toEqual(fixture.expected[index]);
        });
      });
    });
  });
});
