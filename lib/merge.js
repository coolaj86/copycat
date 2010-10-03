"use strict";
var CopyCat = CopyCat || {};
// CommonJS Module
if ('undefined' !== typeof module && 'undefined' !== typeof exports) {
  module.exports = CopyCat;
}
/**
 * This assumes a 'sane' data structure.
 *   * No mixing of set types in arrays - strings XOR (similar) objects
 *   * No nested arrays - objects make this a mute point. You can always easily describe an array
 *   * Only like objects in arrays (books, movies, music - not books, toothbrush, tyranasaur)
 *   * Identical keys of similar objects are assumed to be of the same type
 *
 * There is no reason that arrays should be nested in javascript
 * Nor is there any reason to create a bag of unrelated objects.
 *
 * It does make sense that if a collection holds similar items
 * such as books, movies, and music, that all elements are merged
 * for the sake of the template
 *
 * Since it also makes sense that many elements are undefined on
 * any particular instance, this will not attempt to duck-type
 * the contents of your collection.
 *
 */ 
(function () {
  function merge_json(fixture, other) {
    // figure out what to do with this fixture and other
    if ('undefined' === typeOf(fixture)) {
      return other; // Gotcha: assigning 'undefined' to an object deletes the key!
    } else if ('number' === typeOf(fixture)) {
      return string2single(fixture, other);
    } else if ('boolean' === typeOf(fixture)) {
      return string2single(fixture, other);
    } else if ('string' === typeOf(fixture)) {
      return string2single(fixture, other);
    } else if ('array' === typeOf(fixture)) {
      return array2single(fixture, other);
    } else if ('object' === typeOf(fixture)) {
      return object2single(fixture, other);
    } else if ('function' === typeOf(fixture)) {
      return fixture.toString();
      //alert("functions are not supported");
      return;
    } else {
      alert("Forgot to handle typeof " + typeOf(fixture));
      return;
    }
    // strings are easy - this is where we just throw away values
    function string2single(s1, s2) {
      return s1 || s2;
    }

    // put each item in each array through the merge
    // then merge all items into one array
    function array2single(a1, a2) {
      var a = [];
      a1 = a1 || [];
      a2 = a2 || [];
      if ('array' !== typeOf(a1) || 'array' !== typeOf(a2)) {
        alert('craptastic! expected array');
      }
      while (0 !== a1.length) {
        a.push(merge_json(a1.pop()));
      }
      while (0 !== a2.length) {
        a.push(merge_json(a2.pop()));
      }
      while (a.length > 1) {
        a1 = a.pop();
        a2 = a.pop();
        a.push(merge_json(a1, a2));
      }
      return a;
    }

    // put each member through the merge
    // merge both objects
    function object2single(o1, o2) {
      var o = {};
      // Make sure we can call keys
      o1 = o1 || {};
      o2 = o2 || {};
      if ('object' !== typeOf(o1) || 'object' !== typeOf(o2)) {
        alert('craptastic! expected object');
      }
      // Join the keys of both objects into one array, then merge
      union_str_arr(Object.keys(o1), Object.keys(o2)).forEach(function (key, i, arr) {
        o1[key] = merge_json(o1[key]);
        o2[key] = merge_json(o2[key]);
        o[key] = merge_json(o1[key], o2[key]); // || o1[key] || o2[key];
        //alert("test: " + JSON.stringify(o[key]));
      });
      return o;
    }

    // union two string arrays into 1
    function union_str_arr(ka1, ka2) {
      var o = {};
      if ('undefined' === typeOf(ka1) || 'undefined' === typeOf(ka2)) {
        return ka1 || ka2;
      }
      ka1.forEach(function (key, i, arr) {
        o[key] = "";
      });
      ka2.forEach(function (key, i, arr) {
        o[key] = "";
      });
      return Object.keys(o);
    }
  }

  CopyCat.coalesce = merge_json;
  CopyCat.coalesce.test = function () {
    //console.log(JSON.stringify(fsomething("obj", {str:"stringy",num:1,arr:[1,2,[4,5,6]]}), null, '  '));
    var test = [
      "simple string",
      ["array", "of", "strings"],
      {"a": "object", "b": "of", "c": "strings"},
      [{"a": "array", "b": "of", "c": "objects"},{"c": "of", "d": "strings"}],
      {"a": ["object", "of"], "b": ["arrays", "of", "strings"]}
    ];

    var pre = document.createElement('pre');
    pre.appendChild(document.createTextNode(JSON.stringify(merge_json(CopyCat.coalesce.example)),null,'\t'));
    document.body.insertBefore(pre, document.body.firstChild);
  };
  CopyCat.coalesce.example = {
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
      },
      {
        "first" : "Brianna",
        "middle" : "Marie",
        "last" : "Oviatt",
        "accounts" : {
          "cakewrecks" : "twilight",
          "vark" : "twilight"
        },
        "interests" : {
          "music" : [
            "Death Cab for Bootie",
            "Sunday Night fever"
          ]
        }
      },
      {
        "first" : "AJ",
        "last" : "ONeal",
        "accounts" : {
          "twitter" : "#coolaj86",
          "email" : "coolaj86",
          "aim" : "coolaj1986",
          "linkedin" : "coolaj86",
          "phone" : "317-426-5555",
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
    ]
  };
}());
