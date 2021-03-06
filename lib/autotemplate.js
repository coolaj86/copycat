"use strict";
var CopyCat = CopyCat || {};
// CommonJS Module
if ('undefined' !== typeof module && 'undefined' !== typeof exports) {
  module.exports = CopyCat;
}
(function () {
  function format_label(s) {
    return s.titleize();
  }
  function format_array_item(s) {
    return s.singularize();
  }

  var labelize,
    singularize,
    string_identity;

  // Return the string or an empty string
  string_identity = function(s) {
    if ('string' !== typeOf(s)) {
      s = '';
    }
    return s;
  }

  // recurse until the object is html
  /*
   * TODO - demonstrate use of merge / fold
   * If two people objects have different members - say email and phone
   * merge them into one for the sake of creating the template
   */
  function create_template(){
      // set vars only once
  }

  function json2html(fixture, className, appendName, params) {
    params = params || {};
    if (undefined === typeOf(className)) {
      className = "";
    }
    labelize = labelize || params.labelize || string_identity;
    if ("function" === typeOf(params.singularize)) {
      singularize = params.singularize
    } else if (undefined === singularize) {
      singularize = function (s) {
        return string_identity(s) + "_instance";
      }
    }
    function string2html() {
      var s2h = document.createElement('input');
      s2h.type = 'text';
      s2h.className = className;
      s2h.name = className;
      s2h.value = fixture;
      return s2h;
    }
    function array2html() {
      var i,
      ii,
      ul = document.createElement('ul'),
      li;
      className = singularize(className);
      ul.className = className;
      for (i = 0, ii = fixture.length; i < ii; i += 1) {
        li = document.createElement('li');
        li.appendChild(json2html(fixture[i], className, false));
        ul.appendChild(li);
      }
      return ul;
    }
    function object2html() {
      var pdiv = document.createElement('div'),
      div,
      key;
      pdiv.className = className;
      for (key in fixture) {
        if (fixture.hasOwnProperty(key)) {
          div = document.createElement('div');
          var p = json2html(fixture[key], key, true);
          var s = document.createElement('span');
          s.className='auto_title';
          s.appendChild(document.createTextNode(labelize(key) + ": "));
          div.appendChild(s);
          div.appendChild(p);
          div.className = key + '_container';
          pdiv.appendChild(div);
        }
      }
      return pdiv;
    }
    if ('undefined' === typeOf(fixture)) {
      fixture = 'undefined';
      return string2html();
    } else if ('number' === typeOf(fixture)) {
      fixture = fixture.toString();
      return string2html();
    } else if ('boolean' === typeOf(fixture)) {
      return string2html();
    } else if ("string" === typeOf(fixture)) {
      return string2html();
    } else if ("array" === typeOf(fixture)) {
      return array2html();
    } else if ("object" === typeOf(fixture)) {
      return object2html();
    } else if ("function" === typeOf(fixture)) {
      fixture = fixture.toString();
      return string2html();
      //alert("functions are not supported");
      //return;
    } else {
      alert("unexpected type: " + typeOf(fixture));
    }
  }

  CopyCat.autotemplate = function (fixture, className, params) {
    return json2html(fixture, className, undefined, {
      labelize: format_label,
      singularize: format_array_item
    });
  };
  CopyCat.autotemplate.test = function (better) {
        var fixture = {
          "friends" : [
            {
              "first" : "Jamshid",
              "last" : "Mavandi",
              "accounts" : {
                "gmail" : "mvndaai",
                "facebook" : "mvndaai"
              },
              "interests" : {
                "tv shows" : [
                  "Julian Smith"
                ]
              }
            }
          ],
          // "familiy" : [],
          "self" : {
            "first" : "AJ",
            "last" : "ONeal",
            "accounts" : {
              "twitter" : "#coolaj86",
              "gmail" : "coolaj86",
              "aim" : "coolaj1986",
              "linkedin" : "coolaj86",
              "phone" : "317-426-5555",
              "favorite_number" : 2,
              "facebook" : "coolaj86"
            },
            "interests" : {
              "movies" : [
                "Star Wars Trilogy",
                "Spiderman",
                "The princess bride"
              ]
            }
          }
        };
    fixture = better || fixture;
    return json2html(fixture, "contacts", undefined, {
      labelize: format_label,
      singularize: format_array_item
    });
  }
}());
