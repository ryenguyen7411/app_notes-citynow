// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-mocha
      // Set framework to mocha
      'mocha'
    ],

    reporters: [
      'spec',
    ],

    files: [
      // Reference: https://www.npmjs.com/package/phantomjs-polyfill
      // Needed because React.js requires bind and phantomjs does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',

      // Grab all files in the tests directory that contain _test.
      'tests/**/*_test.*'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'tests/**/*_test.*': ['webpack', 'sourcemap']
    },

    browsers: [
      'Chrome'
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      type: 'html'
    },

    // Test webpack config
    webpack: require('./webpack.config'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    }
  });
};