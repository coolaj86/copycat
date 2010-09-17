try {
    var fixture = JSUnit.createFixture('Framework Tests', {
        aFixture : JSUnit.createFixture('A Fixture', {
            wasRun : false,
            testMethod : function() {
                this.wasRun = true;
            },
            testBrokenMethod : function() {
                throw new Error('Broken test');
            }
        }),

        testFrameworkRunsATest : function() {
            var aTest = this.aFixture.createTest('testMethod');
            if (aTest.wasRun) {
                throw new Error('aTest shouldn\'t have run');
            }
            aTest.run(JSUnit.createResult());
            if (! aTest.wasRun) {
                throw new Error('aTest should have run');
            }
        },

        testFrameworkReportsResults : function() {
            var aTest = this.aFixture.createTest('testMethod');
            var result = aTest.run(JSUnit.createResult());
            var expected = "1 run, 0 failed";
            var actual = result.summary();

            if (expected !== actual) {
                throw new Error(expected + ' !== ' + actual);
            }
        },

        testFailureCount : function() {
            var aTest = this.aFixture.createTest('testBrokenMethod');
            var result = aTest.run();
            var expected = "1 run, 1 failed";
            var actual = result.summary();

            if (expected !== actual) {
                throw new Error(expected + ' !== ' + actual);
            }
        },

        testSuite : function() {
            var suite = JSUnit.createSuite();
            var result = JSUnit.createResult();
            suite.add(this.aFixture.createTest('testMethod'));
            suite.add(this.aFixture.createTest('testBrokenMethod'));

            suite.run(result);

            var expected = "2 run, 1 failed";
            var actual = result.summary();

            if (expected !== actual) {
                throw new Error(expected + ' !== ' + actual);
            }
        }
    });

    var resultFixture = JSUnit.createFixture('Result Tests', {

        testFailedResult : function() {
            var result = JSUnit.createResult();
            result.testStarted();
            result.testFailed();
            var expected = "1 run, 1 failed"
            var actual = result.summary();

            if (expected !== actual) {
                throw new Error(expected + ' !== ' + actual);
            }
        }
    });

    var suite = JSUnit.createSuite();

    suite.add(fixture.createTest('testFrameworkRunsATest'));
    suite.add(fixture.createTest('testFrameworkReportsResults'));
    suite.add(fixture.createTest('testFailureCount'));
    suite.add(resultFixture.createTest('testFailedResult'));
    suite.add(fixture.createTest('testSuite'));

    var result = JSUnit.createResult();
    suite.run(result);

    document.writeln(result.summary());
} catch(e) {
    document.writeln(e.message);
    document.writeln(e.stack);
}
