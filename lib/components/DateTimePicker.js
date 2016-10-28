"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _BaseFormElements = require("./BaseFormElements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cantgetnosleep on 10/4/16.
 */
var DateTimePicker = function (_Component) {
  (0, _inherits3.default)(DateTimePicker, _Component);

  function DateTimePicker(props) {
    (0, _classCallCheck3.default)(this, DateTimePicker);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
  }

  DateTimePicker.prototype.setupPicker = function setupPicker() {
    $('#' + this.props.componentId).datetimepicker(this.props.options);
    $('#' + this.props.componentId).on('dp.change', this.props.onChange);
  };

  DateTimePicker.prototype.componentDidMount = function componentDidMount() {
    this.setupPicker();
  };

  DateTimePicker.prototype.componentDidUpdate = function componentDidUpdate() {
    this.setupPicker();
  };

  DateTimePicker.prototype.render = function render() {
    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { controlId: this.props.formGroupId },
      _react2.default.createElement(
        _BaseFormElements.ControlLabel,
        null,
        this.props.label
      ),
      _react2.default.createElement(
        "div",
        { className: "input-group date", id: this.props.componentId },
        _react2.default.createElement("input", { type: "text", className: "form-control" }),
        _react2.default.createElement(
          "span",
          { className: "input-group-addon" },
          _react2.default.createElement("span", { className: "glyphicon glyphicon-calendar" })
        )
      ),
      _react2.default.createElement(_BaseFormElements.FormControl.Feedback, null)
    );
  };

  return DateTimePicker;
}(_react.Component);

DateTimePicker.propTypes = {
  componentId: _react2.default.PropTypes.string.isRequired,
  formGroupId: _react2.default.PropTypes.string.isRequired,
  label: _react2.default.PropTypes.string.isRequired,
  options: _react2.default.PropTypes.object
};

DateTimePicker.defaultProps = {
  options: { format: 'MM/DD/YYYY' }
};

exports.default = DateTimePicker;