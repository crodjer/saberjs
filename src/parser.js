'use strict';

Saber.Parser = (function () {
  function identityParser(value) {
    return value;
  }

  function integerParser(value, typeData) {
    if (typeof value === 'number') {
      return value;
    } else{
      var radix = typeData && typeData.radix || 10;
      return parseInt(value, radix);
    }
  }

  var stringParser = identityParser;

  function dateTimeParser(value) {
    return new Date(value);
  }

  return {
    identity: identityParser,
    integer: integerParser,
    string: stringParser,
    datetime: dateTimeParser
  };
}());
