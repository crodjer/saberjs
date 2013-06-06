'use strict';

describe('parser', function () {
  it('should provide Parser object', function (){
    expect(typeof Saber.Parser).toBe('object');
  });

  var parsers = {
    integer: [{
      args: ['4'],
      output: 4
    }, {
      args: [3],
      output: 3
    }, {
      args: ['B', {radix: 16}],
      output: 11
    }],

    string: [{
      args: ['foo'],
      output: 'foo'
    }, {
      /*jshint quotmark: false*/
      args: ["bar"],
      /*jshint quotmark: true*/
      output: 'bar'
    }],

    datetime: [{
      args: ['1970-01-01'],
      output: new Date(0)
    }, {
      args: [0],
      output: new Date(0)
    }, {
      args: ['June 5, 2013'], // Saber.js first commit
      output: new Date('June 5, 2013')
    }],

    identity: [{
      args: [{}],
      output: {}
    }, {
      args: [[]],
      output: []
    }]

  };

  Utils.each(parsers, function (cases, parserType) {
    it('should provide ' + parserType + ' parser', function (){
      expect(typeof Saber.Parser[parserType]).toBe('function');
    });

    it('should provide a functioning ' + parserType + ' parser', function (){
      var parser = Saber.Parser[parserType];

      Utils.each(cases, function(testCase) {
        expect(parser.apply(null, testCase.args)).toEqual(testCase.output);
      });
    });
  });
});
