'use strict';

/*
  Allows export of from elements either from Rubix or from react-bootstrap
 */

if (require.resolve("@sketchpixy/rubix")) {
  module.exports = require('@sketchpixy/rubix');
} else {
  module.exports = require('react-bootstrap');
}