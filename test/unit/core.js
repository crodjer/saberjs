'use strict';

describe('core tests', function () {

  it('should provide Saber object', function () {
    expect(typeof Saber).toBe('object');
  });

  it('should provide a Errors object under Saber', function () {
    expect(typeof Saber.Errors).toBe('object');
  });

});
