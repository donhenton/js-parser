// Karma configuration
// Generated on Tue Mar 24 2015 09:16:43 GMT-0500 (CDT)
//http://karma-runner.github.io/0.10/config/configuration-file.html
var babelify = require('babelify');

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../../..',
        autoWatch: false,
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],
        // list of files / patterns to load in the browser
        files: [
             
            'src/code/parser/**/*.js',
            'test/standard/tests/*.js',
        ],
        htmlReporter: {
            outputFile: 'target/test_reports/jasmine_unit_tests.html'

        },
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'target/test_reports/jasmine/html_coverage/',
                    subdir: 'jasmine-phantom',
                    file: 'jasmine-phantom.xml'
                },

                {
                    type: 'cobertura',
                    dir: 'target/test_reports/jasmine/coverage/',
                    subdir: 'phantom',
                    file: 'jasmine-phantom.xml'
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
            'test/standard/tests/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [['babelify', {presets: ["es2015"]}]],
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'dots', 'html','coverage'],
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
        //browsers: ['PhantomJS'],
        browsers: ['PhantomJS'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};