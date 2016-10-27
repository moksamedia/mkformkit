var babelJest = require('babel-jest');
require('babel-register'); // support ES6 'import' statements

module.exports = {
  process: function(src, filename) {

    if (filename.indexOf('node_modules') === -1) {
      src = babelJest.process(src, filename);
    }

    return src;
  }
};