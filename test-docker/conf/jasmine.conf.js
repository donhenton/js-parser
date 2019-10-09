// Karma configuration
// Generated on Tue Mar 24 2015 09:16:43 GMT-0500 (CDT)
//http://karma-runner.github.io/0.10/config/configuration-file.html
//https://medium.com/front-end-weekly/karma-js-headless-chrome-and-docker-35c134df28f3
var babelify = require('babelify');

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../..',
        autoWatch: false,
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],
        // list of files / patterns to load in the browser
        files: [
             
            'src/code/parser/**/*.js',
            'test/tests/*.js',
        ],
        htmlReporter: {
            outputFile: 'target/test_reports/jasmine_unit_tests.html'

        },
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'target/test_reports/jasmine/html_coverage/',
                    subdir: 'jasmine-chrome-headless',
                    file: 'jasmine-chrome-headless.xml'
                },

                {
                    type: 'cobertura',
                    dir: 'target/test_reports/jasmine/coverage/',
                    subdir: 'chrome-headless',
                    file: 'jasmine-chrome-headless.xml'
                }, {
                    type: 'json',
                    dir: 'target/test_reports/jasmine/coverage/',
                    subdir: 'json',
                    file: 'jasmine-coverage.json'
                }]
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            
            'src/code/parser/**/*.js': ['browserify'],
            'test/tests/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [['babelify', {presets: ["es2015"]}]],
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'dots', 'html','coverage','junit'],
        junitReporter: {
            
            outputDir: 'target/test_reports/junit',
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
          },

        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['chrome-headlessJS'],
        browsers: ['Chrome_no_sandbox'],
        customLaunchers: {
            Chrome_no_sandbox: {
            base: 'Chrome',
            flags: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--headless',
              '--disable-gpu',
              '--remote-debugging-port=9222',
            ]
        }
        },
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};