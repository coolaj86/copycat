/*
  This could have been done by hand and doesn't
  need to be included in the package.

  It was just an exercise in bootstrapping
  the meta-data reader by using the meta-data
  to describe... well... itself.

  Fun!
*/

(function () {
var types, meta, description, directive;

// manually specifying a type since javascript 
// doesn't have a way to enumerate them (that I'm aware of)
types = [
  "type",
  "undefined",
  "string",
  "boolean",
  "number",
  "object",
  "array",
  "function"
];

// meta-data primitive
meta = [
  "name",
  "bizname",
  "description",
  "hint",
  "type",
  "enum", // TODO include in validation
  "validations",
  "examples"
];

// data primitive
data = [
  "keyname",
  "Business Name",
  "A descrpition of the term intended for end-users",
  "A validation should be a function, but you supplied a non-function",
  "type",
  types,
  [
    function (item, key, obj) {
      return "array" === typeOf(item) && "function" === typeOf(item[0]);
    }
  ],
  ["i.e.", "e.g.", "For Example", "Example"]
];

// TODO, just use an array and create the directive
directive = {
  name: function (name, data) {
    return name;
  },
  bizname: function (bizname, data) {
    return bizname; // TODO replace 'under_case' with 'Under Case' and 'camelCase' with 'Camel Case'
  },
  description: function (desc, data) {
    return "A " + typeOf(data); // TODO 
  },
  hint: function (hint, data) {
    return "Must be a valid value";
  },
  type: function (type, data) {
    return typeOf(data);
  },
  enum: function () {
    return;
  }, // TODO include in validation
  validations: function (func, data) {
    return function (item, key, collection) {return true;};
    //return [Validate.isOfType(typeOf(data))];
  },
  examples: function (example, data) {
    return [data];
  }
};

var definition = {};
meta.forEach(function (item, key, container) {
    definition[item] = data[key];
});

//console.log(definition);

// Using the meta-data and primitive directives to describe the meta-data
var dictionary = [];
meta.forEach(function (item, key, collection) {
    var def = {};
    meta.forEach(function (subitem, subkey, subcollection) {
        def[subitem] = directive[subitem](item, definition[item]);
    });
    
    dictionary.push(def);
});

console.log(JSON.stringify(dictionary));
}());
