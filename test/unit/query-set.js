'use strict';

describe('data source', function () {

  var source;
  var fixture = {
    data: [
      {name: 'Foo', age: 23, foo: ''},
      {name: 'Bar', age: '25', foo: {}},
      {name: 'FooBar', age: 21, foo: []},
    ],
    expected: [
      {name: 'Foo', age: 23, foo: ''},
      {name: 'Bar', age: 25, foo: {}},
      {name: 'FooBar', age: 21, foo: []},
    ],
    schema: {
      name: {'type': 'string'},
      age: {'type': 'integer'},
      foo: {'type': 'nonexistant'}
    }
  };

  beforeEach(function() {
    source = new Saber.DataSource(fixture.data, fixture.schema);
  });

  it('should provide QuerySet constructor', function () {
    expect(typeof Saber.QuerySet).toBe('function');
  });

  it('should provide exact copy of the source', function () {
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
