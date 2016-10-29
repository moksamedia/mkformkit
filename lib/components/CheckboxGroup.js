'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _props2 = require('./props');

var _props3 = _interopRequireDefault(_props2);

var _BaseFormElements = require('./BaseFormElements');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SwitchLabel = require('./SwitchLabel');

var _SwitchLabel2 = _interopRequireDefault(_SwitchLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}; /**
    * Created by cantgetnosleep on 10/4/16.
    */

var CheckboxGroup = function (_Component) {
  (0, _inherits3.default)(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    (0, _classCallCheck3.default)(this, CheckboxGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      selectedValues: []
    };
    return _this;
  }

  CheckboxGroup.prototype.handleChange = function handleChange(e) {

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

  CheckboxGroup.prototype.render = function render() {
    var _this2 = this;

    if (!this.props.visible) {
      return false;
    }

    var _props = this.props,
        controlId = _props.controlId,
        items = _props.items,
        validationState = _props.validationState,
        helpBlock = _props.helpBlock,
        formGroupClass = _props.formGroupClass,
        formGroupId = _props.formGroupId;


    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { validationState: validationState, bsClass: formGroupClass, id: formGroupId },
      _react2.default.createElement(_SwitchLabel2.default, this.props),
      helpBlock ? _react2.default.createElement(
        _BaseFormElements.HelpBlock,
        null,
        helpBlock
      ) : null,
      _react2.default.createElement(
        'div',
        { id: controlId },
        items.map(function (item) {
          return _react2.default.createElement(CheckboxItem, {
            key: item.value,
            value: item.value,
            text: item.text,
            onChange: _this2.handleChange.bind(_this2),
            checked: _lodash2.default.includes(_this2.state.selectedValues, item.value)
          });
        })
      )
    );
  };

  return CheckboxGroup;
}(_react.Component);

CheckboxGroup.propTypes = (0, _assign2.default)(_props3.default.types, {
  items: _react2.default.PropTypes.array.isRequired
});

CheckboxGroup.defaultProps = _props3.default.defaults;;

exports.default = CheckboxGroup;