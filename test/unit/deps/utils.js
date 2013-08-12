'use strict';

describe('Utils tests', function () {

  function wrapInObject (value) {
    return {
      value: value
    };
  }

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

  it('should provide `pluck` as a function', function () {
    expect(typeof Utils.extend).toBe('function');

    var objectArray = [{
      value: 3,
    }, {
      value: 1,
    }, {
      value: 4,
    }, {
      value: 2,
    }];
    var pluckedArray = [3, 1, 4, 2];

    expect(Utils.pluck(objectArray, 'value')).toEqual(pluckedArray);
  });

  it('should provide `sortBy` as a function', function () {
    expect(typeof Utils.extend).toBe('function');

    var simpleArray = [20, 45, 19, 48, 4, 25, 7, 39, 22, 3, 28, 17,
                       10, 41, 45, 6, 3, 21, 9, 17];
    var sortedSimpleArray = [3, 3, 4, 6, 7, 9, 10, 17, 17, 19, 20, 21,
                             22, 25, 28, 39, 41, 45, 45, 48];

    var objectArray = Utils.map(simpleArray, wrapInObject);
    var sortedObjectArray = Utils.map(sortedSimpleArray,
                                      wrapInObject);
    sortedObjectArray.reverse();

    expect(Utils.sortBy(simpleArray, function(entry) {
      return entry;
    })).toEqual(sortedSimpleArray);

    expect(Utils.sortBy(objectArray, function(entry) {
      return (-entry.value);
    })).toEqual(sortedObjectArray);

  });


  it('should provide `filter` as a function', function () {
    expect(typeof Utils.extend).toBe('function');

    var simpleArray = [true, false, 1, 0, 't', '', {key: 1}, {},
                       [false], []];
    var filteredSimpleArray = [true, 1, 't', {key: 1}, {}, [false],
                               []];

    var objectArray = Utils.map(simpleArray, wrapInObject);
    var filteredObjectArray = Utils.map(filteredSimpleArray,
                                        wrapInObject);

    Utils.map(['filter', 'fallbackFilter'], function (filterKey) {
      expect(Utils[filterKey](simpleArray, function(entry) {
        return entry;
      })).toEqual(filteredSimpleArray);

      expect(Utils[filterKey](objectArray, function(entry) {
        return entry.value;
      })).toEqual(filteredObjectArray);
    });

    expect(Utils.filter(null), []);
    expect(Utils.filter(), []);
  });
});
