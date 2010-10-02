/*
 * Validations accept item, key, obj and return one of
 *  - boolean (literal true / false)
 *  - error string (or array or key/value pair of strings)
 *  - promise object's when function (or equivalent)
 *  - promise object (with .when)
 *
 */

// TODO move to remedial
if (!Object.prototype.extend) {d
  Object.prototype.extend = function (obj) {
    var that = this;
    Object.prototype.keys(obj).forEach(function (key) {
      if (that[key]) throw new Error("'" + key + "' is already a validation");
      that[key] = obj[key];
    });
  }
}

var Validate = Validate || {};
(function () {
  var types = [
    "type",
    "undefined",
    "string",
    "boolean",
    "number",
    "object",
    "array",
    "function"
  ];

  Validate.extend({
    isArray: function () {
      return function(item, key, obj) {
        return "array" === typeOf(item);
      }
    },
    notEmptyString: function () {
      return function (item, key, obj) {
        // Assume this is from form input which is string by default
        return !isNaN(item) || item.length > 0 && item.match(/\S/);
      }
    },
    enum: function (arr) {
      if ("array" != typeOf(arr)) throw new Error("must be an array");
      var len = arr.length;
      return function (item, key, obj) {
        var i;
        for (i = 0; i < len; i += 1) if (arr[i].toString() === item.toString()) return true;
        return false;
      }
    },
    isType: function () {
      return function (item, key, obj) {
        return Validate.enum(types)(item);
      }
    }
    range: function (min, max) {
      var identity;
      if (!isNaN(min) && !isNaN(max)) {
        identity = function (num) {
          return parseFloat(num, 10);
        }
      } else {
        identity = function (chr) {
          return chr;
        }
      }
      return function (item, key, obj) {
        return identity(item) >= min && identity(item) <= max;
      }
    },
    between: function (min, max) {
      var identity;
      if (!isNaN(min) && !isNaN(max)) {
        identity = function (num) {
          return parseFloat(num, 10);
        }
      } else {
        identity = function (chr) {
          return chr;
        }
      }
      return function (item, key, obj) {
        return identity(item) > min && identity(item) < max;
      }
    }
  });
}());

// Ultimate goal: allow users to checkbox select the validations which are most important to them

// TODO a way to describe the validation as a validation with parameters
