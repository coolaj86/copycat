"use strict";
var CopyCat = CopyCat || {};
// CommonJS
if ('undefined' !== typeof module && 'undefined' !== typeof exports) {
  module.exports = CopyCat;
}

(function () {
  //require("../vendor/remedial");

  // get swap values from an args array
  function arguceptor(args, directive, hash) {
    //args = Array.prototype.slice.call(arguments),
    var i = 0,
    d,
    swap,
    a;

    function get_or_swap(key) {
      swap = a[key];
      if ('null' !== typeOf(hash[key])) {
        a[key] = hash[d[key]];
      }
      hash[d[key]] = swap;
    }
    for(i = 0; i < args.length; i += 1) {
      d = directive[i];
      a = args[i];

      // assume the argument exists and skip it
      if (true === d) {
        console.log('d is true');
        continue;
      }

      // if there are optional params 
      // and the length of params is less
      // than the length of directive
      // assume that it is the missing one
      // then decrease the length of the directive
      if ('undefined' === typeOf(d)) {
        console.log('d is undefined');
        if (args.length < directive.length && 0 < directive.length) {
          console.log('shifting...');
          directive.shift();
          i -= 1;
        }
        continue;
      }

      // if we have a name for the sorry sap
      // then grab or swap it from the hash
      if ('string' === typeOf(d)) {
        swap = a;
        if ('null' !== typeOf(hash[d])) {
          a = hash[d];
        }
        hash[d] = swap;
        continue;
      }

      // If the directive is an object
      // get or swap each key
      if ('object' === typeOf(d)) {
        console.log('d is object');
        // but if the arg isn't an object, assume it to be optional
        if ('object' !== typeOf(a) && 0 < directive.length) {
          directive.shift();
          i -= 1;
          continue;
        }
        Object.keys(d).forEach(get_or_swap);
        continue;
      }
    }
    return hash;
  }

  CopyCat.arguceptor = arguceptor;
  CopyCat.arguceptor.test = function () {
    /**
     * Immediate Goal:
     * $.getJSON = subscribify($.getJSON, [true, undefined,'callback', { onError : 'errback', timeout : 'timeout' }])
     */
    var directive = [
      true, 
      undefined, 
      'callback', 
      {
        onError : 'errback',
        timeout : 'timeout'
      }
    ],
    hash = {
      'callback': function () {},
      'errback': function () {},
      timeout: 0
    },
    args = [
      'http://example.com',
      function () {
        return 'original_cb';
      },
      {
        onError: function () {
          return 'original_eb';
        },
        timeout: 42
      }
    ];

    console.log(arguceptor(args, directive, hash).timeout);
  }
}());

  // [] || {} || 0 || '' || false || function(){}  means that it's   required
  // {required: 'name'} == swap values if value exists, otherwise grab
  // { type: [] || {} || 0 || '' || false || function(){} || null || undefined }

  /**
   * End goal:
   * intercepted = interceptor(map1, map2, map3)(wrapperFunc, wrappedFunc);
   */
