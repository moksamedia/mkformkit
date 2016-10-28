'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDates = require('react-dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cantgetnosleep on 10/4/16.
 */
var SingleDatePickerWrapper = function (_React$Component) {
  (0, _inherits3.default)(SingleDatePickerWrapper, _React$Component);

  function SingleDatePickerWrapper(props) {
    (0, _classCallCheck3.default)(this, SingleDatePickerWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = {
      focused: false,
      date: null
    };

    _this.onDateChange = _this.onDateChange.bind(_this);
    _this.onFocusChange = _this.onFocusChange.bind(_this);
    return _this;
  }

  SingleDatePickerWrapper.prototype.onDateChange = function onDateChange(date) {
    this.setState({ date: date });
  };

  SingleDatePickerWrapper.prototype.onFocusChange = function onFocusChange(_ref) {
    var focused = _ref.focused;

    this.setState({ focused: focused });
  };

  SingleDatePickerWrapper.prototype.render = function render() {
    var _state = this.state,
        focused = _state.focused,
        date = _state.date;


    return _react2.default.createElement(_reactDates.SingleDatePicker, (0, _extends3.default)({}, this.props, {
      id: 'date_input',
      date: date,
      focused: focused,
      onDateChange: this.onDateChange,
      onFocusChange: this.onFocusChange
    }));
  };

  return SingleDatePickerWrapper;
}(_react2.default.Component);

exports.default = SingleDatePickerWrapper;