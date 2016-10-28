'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseFormElements = require('./BaseFormElements');

var _RequiredMarker = require('./RequiredMarker');

var _RequiredMarker2 = _interopRequireDefault(_RequiredMarker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineHelpBlock = function InlineHelpBlock(_ref) {
  var text = _ref.text;
  return _react2.default.createElement(
    _BaseFormElements.HelpBlock,
    { className: 'inline-help-block' },
    "( " + text + " )"
  );
}; /**
    * Created by cantgetnosleep on 10/7/16.
    */

var SwitchLabel = function SwitchLabel(_ref2) {
  var label = _ref2.label,
      validationMessage = _ref2.validationMessage,
      inlineHelpBlock = _ref2.inlineHelpBlock,
      required = _ref2.required,
      controlId = _ref2.controlId;


  if (validationMessage) {
    return _react2.default.createElement(
      _BaseFormElements.ControlLabel,
      { htmlFor: controlId },
      _react2.default.createElement(_RequiredMarker2.default, { required: required }),
      label + ' ( ' + validationMessage + ' )'
    );
  } else if (inlineHelpBlock) {
    return _react2.default.createElement(
      _BaseFormElements.ControlLabel,
      { htmlFor: controlId },
      _react2.default.createElement(_RequiredMarker2.default, { required: required }),
      label,
      _react2.default.createElement(InlineHelpBlock, { text: inlineHelpBlock })
    );
  } else {
    return _react2.default.createElement(
      _BaseFormElements.ControlLabel,
      { htmlFor: controlId },
      _react2.default.createElement(_RequiredMarker2.default, { required: required }),
      label
    );
  }
};

SwitchLabel.propTypes = {
  label: _react2.default.PropTypes.string.isRequired,
  validationMessage: _react2.default.PropTypes.string,
  validationState: _react2.default.PropTypes.string,
  inlineHelpBlock: _react2.default.PropTypes.string,
  controlId: _react2.default.PropTypes.string,
  required: _react2.default.PropTypes.bool
};

SwitchLabel.defaultProps = {
  validationMessage: null,
  validationState: null,
  inlineHelpBlock: null,
  required: false
};

exports.default = SwitchLabel;