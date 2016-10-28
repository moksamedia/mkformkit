"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequiredMarker = function RequiredMarker(_ref) {
  var required = _ref.required;

  if (required) {
    return _react2.default.createElement("span", { className: "requiredControl icon-fontello-asterisk" });
  } else {
    return null;
  }
}; /**
    * Created by cantgetnosleep on 10/10/16.
    */
exports.default = RequiredMarker;