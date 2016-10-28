'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseFormElements = require('./BaseFormElements');

var _SwitchLabel = require('./SwitchLabel');

var _SwitchLabel2 = _interopRequireDefault(_SwitchLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectBox = function SelectBox(props) {
  var controlId = props.controlId,
      handleChange = props.handleChange,
      items = props.items,
      label = props.label,
      required = props.required,
      validationMessage = props.validationMessage,
      inlineHelpBlock = props.inlineHelpBlock,
      componentClass = props.componentClass,
      formGroupStyle = props.formGroupStyle,
      controlStyle = props.controlStyle,
      addNotAnswered = props.addNotAnswered;


  var labelProps = [label, required, validationMessage, inlineHelpBlock];

  if (!undefined.props.visible) {
    return null;
  } else {

    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { controlId: controlId, onChange: handleChange, style: formGroupStyle },
      _react2.default.createElement(_SwitchLabel2.default, props),
      helpBlock ? _react2.default.createElement(
        HelpBlock,
        null,
        helpBlock
      ) : null,
      _react2.default.createElement(
        _BaseFormElements.FormControl,
        { componentClass: "select" + (componentClass ? " " + componentClass : ""), placeholder: 'select', style: controlStyle },
        addNotAnswered ? _react2.default.createElement(
          'option',
          { key: 'notAnswered', value: 'notAnswered' },
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
}; /**
    * Created by cantgetnosleep on 10/9/16.
    */

SelectBox.propTypes = {
  controlId: _react2.default.PropTypes.string.isRequired,
  handleChange: _react2.default.PropTypes.func.isRequired,
  items: _react2.default.PropTypes.array.isRequired,
  label: _react2.default.PropTypes.string.isRequired,
  required: _react2.default.PropTypes.bool,
  validationMessage: _react2.default.PropTypes.string,
  inlineHelpBlock: _react2.default.PropTypes.string,
  componentClass: _react2.default.PropTypes.string,
  formGroupStyle: _react2.default.PropTypes.string,
  controlStyle: _react2.default.PropTypes.string,
  addNotAnswered: _react2.default.PropTypes.bool,
  visible: _react2.default.PropTypes.bool,
  validationState: _react2.default.PropTypes.string,
  helpBlock: _react2.default.PropTypes.string
};

SelectBox.defaultProps = {
  required: false,
  addNotAnswered: false,
  visible: true,
  validationState: null,
  validationMessage: null
};

exports.default = SelectBox;