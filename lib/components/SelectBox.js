'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _props = require('./props');

var _props2 = _interopRequireDefault(_props);

var _BaseFormElements = require('./BaseFormElements');

var _SwitchLabel = require('./SwitchLabel');

var _SwitchLabel2 = _interopRequireDefault(_SwitchLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cantgetnosleep on 10/9/16.
 */

var SelectBox = function SelectBox(props) {
  var controlId = props.controlId,
      handleChange = props.handleChange,
      items = props.items,
      helpBlock = props.helpBlock,
      componentClass = props.componentClass,
      formGroupStyle = props.formGroupStyle,
      controlStyle = props.controlStyle,
      addNotAnswered = props.addNotAnswered,
      formGroupClass = props.formGroupClass,
      formGroupId = props.formGroupId,
      validationState = props.validationState,
      visible = props.visible;


  if (!visible) {
    return null;
  } else {

    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { controlId: controlId, onChange: handleChange, style: formGroupStyle, bsClass: formGroupClass, id: formGroupId, validationState: validationState },
      _react2.default.createElement(_SwitchLabel2.default, props),
      helpBlock ? _react2.default.createElement(
        _BaseFormElements.HelpBlock,
        null,
        helpBlock
      ) : null,
      _react2.default.createElement(
        _BaseFormElements.FormControl,
        { componentClass: "select" + (componentClass ? " " + componentClass : ""), placeholder: 'select', style: controlStyle },
        addNotAnswered ? _react2.default.createElement(
          'option',
          { className: 'notAnswered', key: 'notAnswered', value: 'notAnswered' },
          '...'
        ) : null,
        items.map(function (item) {
          return _react2.default.createElement(
            'option',
            { key: item.value, value: item.value },
            item.text
          );
        })
      )
    );
  }
};

SelectBox.propTypes = (0, _assign2.default)({}, _props2.default.types, {
  items: _react2.default.PropTypes.array.isRequired,
  controlStyle: _react2.default.PropTypes.string,
  componentClass: _react2.default.PropTypes.string,
  formGroupStyle: _react2.default.PropTypes.string,
  addNotAnswered: _react2.default.PropTypes.bool
});

SelectBox.defaultProps = (0, _assign2.default)({}, _props2.default.defaults, {
  addNotAnswered: false
});

exports.default = SelectBox;