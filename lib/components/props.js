'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMMON_PROPS = {
  types: {
    // required
    controlId: _react2.default.PropTypes.string.isRequired,
    label: _react2.default.PropTypes.string.isRequired,
    handleChange: _react2.default.PropTypes.func.isRequired,
    // optional
    required: _react2.default.PropTypes.bool,
    visible: _react2.default.PropTypes.bool,
    validationState: _react2.default.PropTypes.string,
    validationMessage: _react2.default.PropTypes.string,
    helpBlock: _react2.default.PropTypes.string,
    inlineHelpBlock: _react2.default.PropTypes.string,
    formGroupClass: _react2.default.PropTypes.string,
    formGroupId: _react2.default.PropTypes.string
  },
  defaults: {
    visible: true
  }
}; /**
    * Created by cantgetnosleep on 10/28/16.
    */

exports.default = COMMON_PROPS;