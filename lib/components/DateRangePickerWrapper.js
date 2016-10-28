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

var _DateRangePickerWrapp; /**
                            * Created by cantgetnosleep on 10/4/16.
                            */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDates = require('react-dates');

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _SwitchLabel = require('./SwitchLabel');

var _SwitchLabel2 = _interopRequireDefault(_SwitchLabel);

var _BaseFormElements = require('./BaseFormElements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        validationState = _props.validationState,
        formGroupStyle = _props.formGroupStyle,
        validationMessage = _props.validationMessage;


    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { validationState: validationState, style: formGroupStyle },
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

DateRangePickerWrapper.propTypes = (_DateRangePickerWrapp = {
  handleChange: _react2.default.PropTypes.func.isRequired,
  label: _react2.default.PropTypes.string.isRequired,
  validationState: _react2.default.PropTypes.bool,
  validationMessage: _react2.default.PropTypes.string,
  formGroupStyle: _react2.default.PropTypes.string,
  controlId: _react2.default.PropTypes.string,
  required: _react2.default.PropTypes.bool,
  startDate: _reactMomentProptypes2.default.momentObj,
  endDate: _reactMomentProptypes2.default.momentObj,
  visible: _react2.default.PropTypes.bool,
  helpBlock: _react2.default.PropTypes.string
}, _DateRangePickerWrapp['helpBlock'] = _react2.default.PropTypes.string, _DateRangePickerWrapp.inlineHelpBlock = _react2.default.PropTypes.string, _DateRangePickerWrapp);

DateRangePickerWrapper.defaultProps = {
  required: false,
  visible: true,
  validationState: null,
  validationMessage: null
};

exports.default = DateRangePickerWrapper;