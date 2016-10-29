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

var RadioItem = function RadioItem(_ref) {
  var value = _ref.value,
      text = _ref.text,
      onChange = _ref.onChange,
      checked = _ref.checked;
  return _react2.default.createElement(
    _BaseFormElements.Radio,
    { style: { paddingLeft: 5 }, value: value, checked: checked, onClick: onChange },
    text
  );
}; /**
    * Created by cantgetnosleep on 10/4/16.
    */

var RadioGroup = function (_Component) {
  (0, _inherits3.default)(RadioGroup, _Component);

  function RadioGroup(props) {
    (0, _classCallCheck3.default)(this, RadioGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      selectedValues: props.value
    };
    return _this;
  }

  RadioGroup.prototype.handleChange = function handleChange(e) {

    var value = e.target.value;

    var newSelectedValues;
    var addingOrRemoving;

    if (this.props.allowsMultiple) {

      if (_lodash2.default.includes(this.state.selectedValues, value)) {
        newSelectedValues = _lodash2.default.without(this.state.selectedValues, value);
        addingOrRemoving = 'removing';
      } else {
        newSelectedValues = _lodash2.default.concat(this.state.selectedValues, [value]);
        addingOrRemoving = 'adding';
      }
    } else {
      newSelectedValues = [value];
      addingOrRemoving = 'adding';
    }

    this.setState({ selectedValues: newSelectedValues });

    if (this.props.allowsMultiple) {
      this.props.handleChange(newSelectedValues, value, addingOrRemoving);
    } else {
      this.props.handleChange(value);
    }
  };

  RadioGroup.prototype.render = function render() {
    var _this2 = this;

    if (!this.props.visible) {
      return false;
    }

    var items = this.props.items;
    var _props = this.props,
        controlId = _props.controlId,
        formGroupClass = _props.formGroupClass,
        formGroupId = _props.formGroupId,
        validationState = _props.validationState,
        helpBlock = _props.helpBlock;


    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { controlId: controlId, bsClass: formGroupClass, id: formGroupId, validationState: validationState },
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
          return _react2.default.createElement(RadioItem, {
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

  return RadioGroup;
}(_react.Component);

RadioGroup.propTypes = (0, _assign2.default)({}, _props3.default.types, {
  items: _react2.default.PropTypes.array.isRequired,
  allowsMultiple: _react2.default.PropTypes.bool
});

RadioGroup.defaultProps = (0, _assign2.default)({}, _props3.default.defaults, {
  allowsMultiple: false
});

exports.default = RadioGroup;