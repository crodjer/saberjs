'use strict';

var Fields = {};

function Field(name, value, typeData) {
  this.name = name;
  this.value = value;
  this.typeData = typeData;
}
Field.prototype.parser = function parser() {
  return this.value;
};
Field.prototype.parse = function parse() {
  this.parsed = this.parser(this.value, this.typeData);
  return this.parsed;
};
Field.prototype.toString = function toString() {
  return this.constructor.name + ': ' + this.parsed;
};

var IntegerField = function IntegerField(name, value, typeData) {
  this.name = name;
  this.jsClass = Number;
  this.typeData = typeData;
  this.value = value;
};
IntegerField.prototype = new Field();
IntegerField.prototype.parser = function parser() {
  if (typeof this.value === 'number') {
    return this.value;
  } else{
    return parseInt(this.value, this.typeData.radix || 10);
  }
};
Fields.integer = IntegerField;

var StringField = function StringField(name, value) {
  this.name = name;
  this.jsClass = String;
  this.value = value;
};
StringField.prototype = new Field();
StringField.constructor = Field;
Fields.string = StringField;

var DateTimeField = function DateTimeField(name, value) {
  this.name = name;
  this.jsClass = Date;
  this.value = value;
};
DateTimeField.prototype = new Field();
DateTimeField.prototype.parser = function parser() {
  var date = new Date(this.value);
  return date;
};
Fields.datetime = DateTimeField;
