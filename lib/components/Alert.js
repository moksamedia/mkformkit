'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseFormElements = require('./BaseFormElements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cantgetnosleep on 10/29/16.
 */

var Alert = function (_FormAlert) {
  (0, _inherits3.default)(Alert, _FormAlert);

  function Alert() {
    (0, _classCallCheck3.default)(this, Alert);
    return (0, _possibleConstructorReturn3.default)(this, _FormAlert.apply(this, arguments));
  }

  Alert.prototype.render = function render() {
    var _props = this.props,
        controlId = _props.controlId,
        controlClass = _props.controlClass,
        message = _props.message,
        visible = _props.visible,
        style = _props.style;


    if (!visible) {
      return null;
    }

    return _react2.default.createElement(
      _BaseFormElements.Alert,
      { id: controlId, bsClass: controlClass, bsStyle: style },
      _react2.default.createElement(
        'strong',
        { style: { paddingRight: 10 } },
        preMessage
      ),
      _react2.default.createElement(
        'span',
        null,
        message
      )
    );
  };

  return Alert;
}(_BaseFormElements.Alert);

Alert.propTypes = {
  controlId: _react2.default.PropTypes.string.isRequired,
  message: _react2.default.PropTypes.string.isRequired,
  preMessage: _react2.default.PropTypes.string,
  controlClass: _react2.default.PropTypes.string,
  visible: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.string
};

Alert.defaultProps = {
  visible: false,
  style: 'warning',
  preMessage: 'Ooops!',
  message: ''
};

exports.default = Alert;