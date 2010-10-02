/*
 * An intuitive definition directive for describing data, describing itself
 */

var types, meta, description, directive;

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

// TODO find a way to extract valid values (enum, range) from validations
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

data = [
  "keyname",
  "Business Name",
  "A descrpition of the term intended for end-users",
  "The validation is not a function",
  "type",
  types,
  [
    function (item, key, obj) {
      return "array" === typeOf(item) && "function" === typeOf(item[0]);
    }
  ],
  ["i.e.", "e.g.", "For Example", "Example"] 
];

//TODO if fed in {"data": data, "meta": meta, "etc": etc}
// return [{key: key, data:data.key, meta: meta.key, etc:etc.key } foreach item in list]

/*
// TODO key from array
  {
    b: { key2: c },
    a: { key2: z },
  }
// TODO array by key
  [ // sorted by 'key'
    {key: a, key2: z},
    {key: b, key2: c},
  ]
*/

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
    return [Validate.isOfType(typeOf(data))];
  },
  examples: function (example, data) {
    return [data];
  }
};

function appendigate(keys, description, directive) {
  var dictionary = [];
  keys.forEach(function (value) {
    var definition = {};
    description.forEach(function (atom) {
      definition[atom] = directive[atom](value);
    });
  }); 
  return dictionary;
}

description = [
  {
    name: "name",
    bizname: "Name",
    description: "The key name to use for an object",
    hint: "The name should be safe to use as an accessor",
    type: "",
    validations: [ // TODO [a-zA-Z][a-zA-Z0-9_]+ only keystring - no ., $, -, etc
      function (item, key, obj) {
        return item.match(/\w+/) || this.hint;
      }
    ],
    examples: [
      "name",
      "keyname",
      "key"
    ]
  },
  {
    name: "bizname",
    bizname: "Business Name",
    description: "A name with proper capitalization, punctuation, etc - which is suitable for end-users.",
    type: "",
  },
  {
    name: "description",
    bizname: "Description",
    description: "Further explanation for those to whom the business name alone isn't descriptive enough."
    type: "",
  },
  {
    name: "hint",
    bizname: "onError Hint",
    description: "A hint to show the user when the validation doesn't return a specific error message."
  },
  {
    name: "type",
    bizname: "Type",
    description: "Which type of input to expect. Adds an automatic validation for types other than 'string'",
    type: "type",
    enum: types,
  },
  {
    name: "enum",
    bizname: "Enumeration",
    description: "A finite list of items to choose from - suitable for a select- or combo-box.",
    type: [],
    validations: [
      Validate.isArray()
    ]
  }
]
// TODO Validate.isType()
