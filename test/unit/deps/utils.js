'use strict';

describe('Utils tests', function () {

  it('should provide `Utils` as a object', function () {
    expect(typeof Utils).toBe('object');
  });

  it('should proivide `each` as function', function () {
    expect(typeof Utils.each).toBe('function');

    var counter = 0;
    var object = {
      foo: 1,
      bar: 2
    };

    Utils.each(object, function (value) {
      counter += value;
    });

    expect(counter).toBe(3);

    counter = 0;
    var array = [
      1,
      2
    ];

    Utils.each(array, function (value) {
      counter += value;
    });

    expect(counter).toBe(3);
  });

  it('should provide `map` as a function', function () {
    expect(typeof Utils.map).toBe('function');

    var input = [
      1,
      2
    ];

    function mapper(value) {
      return value * 2;
    }

    var output = Utils.map(input, mapper);

    Utils.each(input, function (value, index) {
      expect(output[index]).toBe(mapper(value));
    });
  });

  it('should provide `extend` as a function', function () {
    expect(typeof Utils.extend).toBe('function');

    var object = {
      foo: 1,
    }, extender = {
      bar: 2,
    }, expected = {
      foo: 1,
      bar:2
    }, extended = Utils.extend(object, extender);

    expect(object).toBe(extended);
    expect(extended).toEqual(expected);

  });
});
