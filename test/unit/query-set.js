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
    source.query(function (err, querySet) {
      querySet.execute(function (err, models) {
        expect(models.length).toBe(fixture.data.length);

        Utils.each(models, function(model, index) {
          expect(model).toEqual(fixture.expected[index]);
        });
      });
    });
  });

  it('should allow for sorting of data', function () {
    var expected = Utils.sortBy(fixture.expected, function(entry) {
      return entry.age;
    });

    // Simple sort just by key
    source.query(function (err, querySet) {
      querySet.sort('age')
        .execute(function (err, models) {
          expect(models.length).toBe(fixture.data.length);

          Utils.each(models, function(model, index) {
            expect(model).toEqual(expected[index]);
          });
        });
    });

    // Try a descending sort now.
    expected.reverse();
    source.query(function (err, querySet) {
      querySet.sort(function (model) {
        return -model.age;
      }).execute(function (err, models) {

        expect(models.length).toBe(fixture.data.length);
        Utils.each(models, function(model, index) {
          expect(model).toEqual(expected[index]);
        });
      });
    });
  });

  it('should allow for filtering of data', function () {
    var filterFunction = function filterFunction(model) {
      return model.age > 21;
    };

    var expected = Utils.filter(fixture.expected, filterFunction);

    source.query(function (err, querySet) {
      querySet.filter(filterFunction)
        .execute(function (err, models) {
          expect(models.length).toBe(expected.length);

          Utils.each(models, function(model, index) {
            expect(model).toEqual(expected[index]);
          });
        });
    });
  });
});
