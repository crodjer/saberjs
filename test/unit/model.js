'use strict';

describe('model', function () {

  // Reused test data
  var fixture = {
    data: {
      name: 'foo',
      rating: 10,
      lastmod: '2001-02-06'
    },
    schema: {
      name: {
        type: 'string',
      },
      rating: {
        type: 'integer'
      },
      lastmod: {
        type: 'datetime'
      }
    },
    expected: {
      name: 'foo',
      rating: 10,
      lastmod: (new Date('2001-02-06'))
    }
  };

  it('should provide Model constructor', function () {
    expect(typeof Model).toBe('function');
  });

  it('should provide proper fields', function () {

    var model = new Model(fixture.data, fixture.schema);

    expect(fixture.data).toEqual(model._data);

    Utils.each(model.fields, function (field) {
      expect(field.value).toEqual(fixture.data[field.name]);
      expect(field.parsed.constructor).toBe(field.jsClass);
    });
  });

  it('should provide a way to get attribute values', function () {

    var model = new Model(fixture.data, fixture.schema);

    Utils.each(fixture.data, function (value, key) {
      expect(model.get(key)).toEqual(fixture.expected[key]);
    });
  });

});
