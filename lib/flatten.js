"use strict";
var CopyCat = CopyCat || {};
// CommonJS
if ('undefined' !== typeof module && 'undefined' !== typeof exports) {
  module.exports = CopyCat;
}

(function () {
  var fsomething,
    fliteral,
    farray,
    fobject;

  function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
      if (value) {
        if (typeof value.length === 'number' &&
          !(value.propertyIsEnumerable('length')) &&
          typeof value.splice === 'function') {
          s = 'array';
        }
      } else {
        s = 'null';
      }
    }
    return s;
  } // Thanks to Crockford

  fsomething = function (key, val) {
    switch(typeOf(val)) {
      case "object":
        return fobject(key, val);
        break;
      case "array":
        return farray(key, val);
        break;
      case "undefined":
        return 'undefined';
      default:
        return fliteral(key, val);
    }
  }

  fliteral = function (key, val) {
    var o = {};
    o[key] = val.toString();
    return o;
  };

  farray = function (key, arr) {
    var o = {};
    o[key] = "[]";
    arr.forEach(function (val, i) {
      var nobj = fsomething("[" + i + "]", val);
      Object.keys(nobj).forEach(function (nkey) {
        o[key + nkey] = nobj[nkey];
      });
    });
    return o;
  }

  fobject = function (skey, obj) {
    var o = {};
    o[skey] = "{}";
    Object.keys(obj).forEach(function (key) {
      var nobj = fsomething('.' + key, obj[key]);
      Object.keys(nobj).forEach(function (nkey) {
        o[skey + nkey] = nobj[nkey];
      });
    });
    return o;
  }

  CopyCat.flatten = fsomething;
  CopyCat.flatten.test = function () {
    console.log(JSON.stringify(fsomething("obj", {str:"stringy",num:1,arr:[1,2,[4,5,6]]}), null, '  '));
  }
}());
