'use strict';

describe('data source tests', function () {

  it('should provide DataSource constructor', function () {
    var source = new Saber.DataSource();

    expect(typeof Saber.DataSource).toBe('function');
    expect(typeof source).toBe('object');
  });

  it('should provide exact copy of the source', function () {
    var data = [
      {name: 'Foo', age: 23},
      {name: 'Bar', age: 25},
      {name: 'FooBar', age: 21},
    ];

    var source = new Saber.DataSource(data);

    expect(source.data).toBe(data);
  });

});
