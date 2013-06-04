'use strict';

describe('data source tests', function () {
  it('should provide DataSource constructor', function () {
    var source = new Saber.DataSource();

    expect(typeof Saber.DataSource).toBe('function');
    expect(typeof source).toBe('object');
  });
});
