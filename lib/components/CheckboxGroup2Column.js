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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SwitchLabel = require('./SwitchLabel');

var _SwitchLabel2 = _interopRequireDefault(_SwitchLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cantgetnosleep on 10/4/16.
 */

var CheckboxItem = function CheckboxItem(_ref) {
  var value = _ref.value,
      text = _ref.text,
      onChange = _ref.onChange,
      checked = _ref.checked;
  return _react2.default.createElement(
    _BaseFormElements.Checkbox,
    { style: { paddingLeft: 5 }, value: value, checked: checked, onClick: onChange },
    text
  );
};

var CheckboxGroup2Column = function (_Component) {
  (0, _inherits3.default)(CheckboxGroup2Column, _Component);

  function CheckboxGroup2Column(props) {
    (0, _classCallCheck3.default)(this, CheckboxGroup2Column);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      selectedValues: props.value
    };
    return _this;
  }

  CheckboxGroup2Column.prototype.handleChange = function handleChange(e) {

    var value = e.target.value;

    var newSelectedValues;

    if (_lodash2.default.includes(this.state.selectedValues, value)) {
      newSelectedValues = _lodash2.default.without(this.state.selectedValues, value);
    } else {
      newSelectedValues = _lodash2.default.concat(this.state.selectedValues, [value]);
    }

    this.setState({ selectedValues: newSelectedValues });

    this.props.handleChange(newSelectedValues, value);
  };

  CheckboxGroup2Column.prototype.render = function render() {
    var _this2 = this;

    if (!this.props.visible) {
      return false;
    }

    var _props = this.props,
        controlId = _props.controlId,
        items = _props.items,
        formGroupClass = _props.formGroupClass,
        formGroupId = _props.formGroupId,
        helpBlock = _props.helpBlock;


    var chunks = _lodash2.default.chunk(items, Math.ceil(items.length / 2));

    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { controlId: controlId, bsClass: formGroupClass, id: formGroupId },
      _react2.default.createElement(_SwitchLabel2.default, this.props),
      helpBlock ? _react2.default.createElement(
        HelpBlock,
        null,
        helpBlock
      ) : null,
      _react2.default.createElement(
        _BaseFormElements.Row,
        null,
        _react2.default.createElement(
          _BaseFormElements.Col,
          { md: 6, sm: 12 },
          chunks[0].map(function (item) {
            return _react2.default.createElement(CheckboxItem, {
              key: item.value,
              value: item.value,
              text: item.text,
              onChange: _this2.handleChange.bind(_this2),
              checked: _lodash2.default.includes(_this2.state.selectedValues, item.value)
            });
          })
        ),
        _react2.default.createElement(
          _BaseFormElements.Col,
          { md: 6, sm: 12 },
          chunks[1].map(function (item) {
            return _react2.default.createElement(CheckboxItem, {
              key: item.value,
              value: item.value,
              text: item.text,
              onChange: _this2.handleChange.bind(_this2),
              checked: _lodash2.default.includes(_this2.state.selectedValues, item.value)
            });
          })
        )
      )
    );
  };

  return CheckboxGroup2Column;
}(_react.Component);

CheckboxGroup2Column.propTypes = {
  // required
  controlId: _react2.default.PropTypes.string.isRequired,
  label: _react2.default.PropTypes.string.isRequired,
  handleChange: _react2.default.PropTypes.func.isRequired,
  items: _react2.default.PropTypes.array.isRequired,
  // optional
  required: _react2.default.PropTypes.bool,
  visible: _react2.default.PropTypes.bool,
  validationState: _react2.default.PropTypes.string,
  validationMessage: _react2.default.PropTypes.string,
  helpBlock: _react2.default.PropTypes.string,
  inlineHelpBlock: _react2.default.PropTypes.string,
  formGroupClass: _react2.default.PropTypes.string,
  formGroupId: _react2.default.PropTypes.string
};

CheckboxGroup2Column.defaultValues = {
  visible: true,
  validationState: null,
  validationMessage: null
};

exports.default = CheckboxGroup2Column;