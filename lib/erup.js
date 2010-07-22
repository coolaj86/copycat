(function () {
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
}


  function isFunction(o) {return 'function' == typeof o;}
  function isArray(o) {return isObject(o) && o.constructor == Array;}
  function isAlien(o) {return isObject(o) && ! isFunction(o.constructor);}
  function isObject(o) {return (o && "object" == typeof o) || isFunction(o);}
  function isObjectHash(o) {
    return Object.keys(o) && !o.length;
  }

  // NOTE to self: red, green, refactor
  var directives = [];
  directives.push({
    "ipaddr" : ".network .ipaddr",
    "netmask" : ".network .netmask",
    "gateway" : ".network .gateway"
  });

  directives.push({
    "ipaddr" : {
      ".network .ipaddr" : function (value) {
        return value
      },
    },
    "netmask" : ".network .netmask",
    "gateway" : ".network .gateway"
  });

  function erup(directive) {
    var data = {},
    key,
    k;
    //alert(directive[key]);
    for (key in directive) {
      if(isObjectHash(directive[key])) {
        //alert("key: " + key); //ipaddr
        //alert("val: " + JSON.stringify(directive[key],null,'\t')); // {'sel':func}
        var k = Object.keys(directive[key])[0];
        //alert("k: " + k); //"sel"
        //alert("$(k).val() :" + $(k).val());
        data[key] = directive[key][k]($(k).val());
      } else {
        data[key] = $(directive[key]).val();
      }
    }
    return data;
  }

/*
  {
    "value" : "selector",
    "val2" : function(dom||document){},
    "val3" : [
      "selector",
      func
    ],
    "values" : {
      "value<-" : "selector"
    },
    "value" : {
      "selector" : function(dom) {
      }
    }
  }
*/

  function scraper(dom, directive) {
    var data = {};
    var fns = [];

    // read directives
    var target, dsel;
    for(var val in directive){
      if(directive.hasOwnProperty(val)){
        dsel = directive[val];
        if('function' === typeof(dsel) || 'string' === typeof(dsel)){
          // set the value for the node/attr
          target = gettarget(dom, dsel, false);
          //setsig(target, fns.length);
          fns[fns.length] = wrapquote(target.quotefn, dataselectfn(dsel));
        }else{
          // loop on node
          loopgen(dom, sel, dsel, fns);
        }
      }
    }

      
    return data;
  }

  function _scrape(directive, context, template) {
    var rfn = compiler( ( template || this[0] ).cloneNode(true), directive, ctxt);
    return function(context){
      return rfn({context:context});
    };
  }

  function scrape(context, directive) {
  }

  $(function() {
    var happy;
    directives.forEach(function (directive, i, arr) {
      happy = _.isEqual(scrape(directive), {
        ipaddr: "208.97.56.78",
        netmask: "255.255.255.240",
        gateway: "208.97.56.65"
      });
      if (happy) {
        alert("happy!");
      } else {
        alert("sad!");
      }
    });
  });

  /* Thinking out loud
    people : [
      {
        "name" : ".person .name",
        "email" : [
          ".person .email",
        ],
        "uid" : ".person .uid"
      },
    ]

  */
}());

