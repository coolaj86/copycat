if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}
function new_constructor(extend, initializer, methods) {
    var prototype = Object.create(extend && extend.prototype);

    if (methods) {
        for (key in methods) {
            prototype[key] = methods[key];
        }
    }

    var func = function () {
        var that = Object.create(prototype);
        if (typeof initializer === 'function') {
            initializer.apply(that, arguments);
        }
        return that;
    };

    func.prototype = prototype;
    prototype.constructor = func;
    return func;
}

(function() {
  // Framework code

  var JSUnit = {};

  // Make a new 'function' called createTest
  // that each time we call it, will make a single test
  JSUnit.createTest = new_constructor(
      // extends
      null,

      // initializer
      function(name, methods) {
          this.name = name;
          for (var key in methods) {
              this[key] = methods[key];
          }
      },

      // methods
      {
          run : function() {
              var result = JSUnit.createResult(); 
              result.testStarted();

              this[this.name]();
              return result;
          },
      }
  );

  JSUnit.createResult = new_constructor(
    // extends
    null,

    // initializer,
    function() {
      this.runCount = 0;
      this.failedCount = 0;
    },

    // methods
    {
        summary : function() {
            return this.runCount + " run, " + this.failedCount  + " failed";
        },
        testStarted : function() {
            this.runCount += 1;
        },
        testFailed : function() {
            this.failedCount += 1;
        }
    }
  );

  JSUnit.createFixture = new_constructor(
      // extends
      null,

      // initializer
      function(fixtureName, methods) {
          this.fixtureName = fixtureName;
          for (var key in methods) {
              this[key] = methods[key];
          }
      },

      // methods
      {
          run : function(result) {
              if (! result) {
                  result = JSUnit.createResult();
              }
              result.testStarted();
              try {
                this[this.name]();
              } catch(e) {
                result.testFailed();
                console.log(e.message);
              }
              return result;
          },

          createTest : function(testName) {
              var that = Object.create(this);
              that.name = testName;
              return that;
          }
      }
  );

  JSUnit.createSuite = new_constructor(
      // extends
      null,

      // initializer
      function() {
          this.tests = [];
      },

      // methods
      {
          add : function(test) {
              this.tests.push(test);
          },

          run : function(result) {
              for (var i=0; i < this.tests.length; i+=1) {
                  this.tests[i].run(result);
              }
          }
      }
  );

  window.JSUnit = JSUnit;
}());
