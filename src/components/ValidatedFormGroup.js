/**
 * Created by cantgetnosleep on 9/26/16.
 */

import React, { Component } from 'react';

import COMMON_PROPS from './props';

import {
  FormGroup,
  FormControl,
  InputGroup,
  HelpBlock
} from './BaseFormElements';

import SwitchLabel from './SwitchLabel';


const FormGroupWrapper = (props) => {

  let {
    label,
    controlId,
    validationState,
    validationMessage,
    formGroupStyle,
    inlineHelpBlock,
    helpBlock,
    required,
    formGroupClass,
    formGroupId
  } = props;

  controlId = controlId ? controlId : label.toLowerCase().replace(/\s+/g, '-');

  return (

    <FormGroup controlId={controlId} bsClass={formGroupClass} id={formGroupId} validationState={validationState} style={formGroupStyle}>
      { label ? <SwitchLabel label={label} validationMessage={validationMessage} inlineHelpBlock={inlineHelpBlock} required={required} /> : null }
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock>  : null }
        {props.children}
    </FormGroup>

  );

};


const ValidatedFormGroup = (props) => {

  let {
    type,
    placeHolder,
    handleChange,
    value,
    componentClass,
    usesInputGroup,
    preAddOn,
    postAddOn,
    controlStyle,
    visible,
    controlId,
    formGroupClass,
    formGroupId
  } = props;

  if (!visible) {
    return null;
  }
  else if (usesInputGroup) {
    return (

      <FormGroupWrapper {...props}>
        <InputGroup>
          {preAddOn ? <InputGroup.Addon>{preAddOn}</InputGroup.Addon> : null}
          <FormControl
            type={type}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            componentClass={componentClass}
            style={controlStyle}
          />
          {postAddOn ? <InputGroup.Addon>{postAddOn}</InputGroup.Addon> : null}
        </InputGroup>
        {postAddOn ? null : <FormControl.Feedback />}
      </FormGroupWrapper>
    )
  }
  else {
    return (
      <FormGroupWrapper {...props}>
        <FormControl
          style={controlStyle}
          type={type}
          value={value}
          placeholder={placeHolder}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
          componentClass={componentClass}
        />
        <FormControl.Feedback />
      </FormGroupWrapper>
    )
  }


};

ValidatedFormGroup.propTypes = Object.assign({}, COMMON_PROPS.types, {
  // Optional
  type: React.PropTypes.string,
  placeHolder: React.PropTypes.string,
  value: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  usesInputGroup: React.PropTypes.bool,
  preAddOn: React.PropTypes.string,
  postAddOn: React.PropTypes.string,
  controlStyle: React.PropTypes.object,
  formGroupStyle: React.PropTypes.object,
});

ValidatedFormGroup.defaultProps = Object.assign({}, COMMON_PROPS.defaults, {
  componentClass:'input',
  controlId:'',
  type:'text'
});

export default ValidatedFormGroup;