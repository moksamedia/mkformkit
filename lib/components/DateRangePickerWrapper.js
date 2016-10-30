'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _SwitchLabel = require('./SwitchLabel');

var _SwitchLabel2 = _interopRequireDefault(_SwitchLabel);

var _props2 = require('./props');

var _props3 = _interopRequireDefault(_props2);

var _BaseFormElements = require('./BaseFormElements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cantgetnosleep on 10/4/16.
 */

var DateRangePickerWrapper = function (_React$Component) {
  (0, _inherits3.default)(DateRangePickerWrapper, _React$Component);

  function DateRangePickerWrapper(props) {
    (0, _classCallCheck3.default)(this, DateRangePickerWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    if (props.value && _.has(props.value, 'start') && _.has(props.value, 'end')) {
      _this.state = {
        focusedInput: null,
        startDate: props.value.start,
        endDate: props.value.end
      };
    } else {
      _this.state = {
        focusedInput: null,
        startDate: null,
        endDate: null
      };
    }

    _this.onDatesChange = _this.onDatesChange.bind(_this);
    _this.onFocusChange = _this.onFocusChange.bind(_this);
    return _this;
  }

  DateRangePickerWrapper.prototype.onDatesChange = function onDatesChange(_ref) {
    var startDate = _ref.startDate,
        endDate = _ref.endDate;

    this.setState({ startDate: startDate, endDate: endDate });
    // only send update when both values are set
    if (startDate != null && endDate != null) {
      this.props.handleChange({ startDate: startDate, endDate: endDate });
    }
  };

  DateRangePickerWrapper.prototype.onFocusChange = function onFocusChange(focusedInput) {
    this.setState({ focusedInput: focusedInput });
  };

  DateRangePickerWrapper.prototype.render = function render() {

    if (!this.props.visible) {
      return false;
    }

    var _state = this.state,
        focusedInput = _state.focusedInput,
        startDate = _state.startDate,
        endDate = _state.endDate;
    var _props = this.props,
        controlId = _props.controlId,
        formGroupClass = _props.formGroupClass,
        formGroupId = _props.formGroupId,
        formGroupStyle = _props.formGroupStyle,
        helpBlock = _props.helpBlock,
        validationState = _props.validationState;


    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { controlId: controlId, validationState: validationState, bsClass: formGroupClass, id: formGroupId, style: formGroupStyle },
      _react2.default.createElement(_SwitchLabel2.default, this.props),
      helpBlock ? _react2.default.createElement(
        HelpBlock,
        null,
        helpBlock
      ) : null,
      _react2.default.createElement(_reactDates.DateRangePicker, (0, _extends3.default)({
        id: controlId,
        onDatesChange: this.onDatesChange,
        onFocusChange: this.onFocusChange,
        focusedInput: focusedInput,
        startDate: startDate,
        endDate: endDate
      }, this.props))
    );
  };

  return DateRangePickerWrapper;
}(_react2.default.Component);

DateRangePickerWrapper.propTypes = (0, _assign2.default)({}, _props3.default.types, {
  startDate: _reactMomentProptypes2.default.momentObj,
  endDate: _reactMomentProptypes2.default.momentObj
});

DateRangePickerWrapper.defaultProps = _props3.default.defaults;

exports.default = DateRangePickerWrapper;