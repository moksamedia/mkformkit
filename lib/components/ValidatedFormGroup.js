'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseFormElements = require('./BaseFormElements');

var _SwitchLabel = require('./SwitchLabel');

var _SwitchLabel2 = _interopRequireDefault(_SwitchLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormGroupWrapper = function FormGroupWrapper(props) {
  var label = props.label,
      controlId = props.controlId,
      validationState = props.validationState,
      validationMessage = props.validationMessage,
      formGroupStyle = props.formGroupStyle,
      inlineHelpBlock = props.inlineHelpBlock,
      helpBlock = props.helpBlock,
      required = props.required;


  controlId = controlId ? controlId : label.toLowerCase().replace(/\s+/g, '-');

  return _react2.default.createElement(
    _BaseFormElements.FormGroup,
    { controlId: controlId, validationState: validationState, style: formGroupStyle },
    label ? _react2.default.createElement(_SwitchLabel2.default, { label: label, validationMessage: validationMessage, inlineHelpBlock: inlineHelpBlock, required: required }) : null,
    helpBlock ? _react2.default.createElement(
      _BaseFormElements.HelpBlock,
      null,
      helpBlock
    ) : null,
    props.children
  );
}; /**
    * Created by cantgetnosleep on 9/26/16.
    */

var ValidatedFormGroup = function ValidatedFormGroup(props) {
  var type = props.type,
      placeHolder = props.placeHolder,
      handleChange = props.handleChange,
      value = props.value,
      componentClass = props.componentClass,
      usesInputGroup = props.usesInputGroup,
      preAddOn = props.preAddOn,
      postAddOn = props.postAddOn,
      controlStyle = props.controlStyle;


  if (usesInputGroup) {
    return _react2.default.createElement(
      FormGroupWrapper,
      props,
      _react2.default.createElement(
        _BaseFormElements.InputGroup,
        null,
        preAddOn ? _react2.default.createElement(
          _BaseFormElements.InputGroup.Addon,
          null,
          preAddOn
        ) : null,
        _react2.default.createElement(_BaseFormElements.FormControl, {
          type: type,
          value: value,
          placeholder: placeHolder,
          onChange: handleChange,
          componentClass: componentClass,
          style: controlStyle
        }),
        postAddOn ? _react2.default.createElement(
          _BaseFormElements.InputGroup.Addon,
          null,
          postAddOn
        ) : null
      ),
      postAddOn ? null : _react2.default.createElement(_BaseFormElements.FormControl.Feedback, null)
    );
  } else {
    return _react2.default.createElement(
      FormGroupWrapper,
      props,
      _react2.default.createElement(_BaseFormElements.FormControl, {
        style: controlStyle,
        type: type,
        value: value,
        placeholder: placeHolder,
        onChange: function onChange(e) {
          handleChange(e.target.value);
        },
        componentClass: componentClass
      }),
      _react2.default.createElement(_BaseFormElements.FormControl.Feedback, null)
    );
  }
};

ValidatedFormGroup.propTypes = {

  // Required
  label: _react2.default.PropTypes.string,
  handleChange: _react2.default.PropTypes.func.isRequired,

  // Optional
  controlId: _react2.default.PropTypes.string,
  validationState: _react2.default.PropTypes.string,
  validationMessage: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string,
  placeHolder: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  componentClass: _react2.default.PropTypes.string,
  usesInputGroup: _react2.default.PropTypes.bool,
  preAddOn: _react2.default.PropTypes.string,
  postAddOn: _react2.default.PropTypes.string,
  controlStyle: _react2.default.PropTypes.object,
  inlineHelpBlock: _react2.default.PropTypes.string,
  helpBlock: _react2.default.PropTypes.string,
  formGroupStyle: _react2.default.PropTypes.object,
  required: _react2.default.PropTypes.bool

};

ValidatedFormGroup.defaultProps = {
  componentClass: 'input',
  usesInputGroup: false,
  required: false,
  controlId: '',
  type: 'text'
};

exports.default = ValidatedFormGroup;