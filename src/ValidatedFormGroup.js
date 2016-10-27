/**
 * Created by cantgetnosleep on 9/26/16.
 */

import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  InputGroup,
  HelpBlock
} from '@sketchpixy/rubix';

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
    required
  } = props;

  controlId = controlId ? controlId : label.toLowerCase().replace(/\s+/g, '-');

  return (

    <FormGroup controlId={controlId} validationState={validationState} style={formGroupStyle}>
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
    controlStyle
  } = props;

  if (usesInputGroup) {
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

ValidatedFormGroup.propTypes = {

  // Required
  label: React.PropTypes.string,
  handleChange: React.PropTypes.func.isRequired,

  // Optional
  controlId: React.PropTypes.string,
  validationState: React.PropTypes.string,
  validationMessage: React.PropTypes.string,
  type: React.PropTypes.string,
  placeHolder: React.PropTypes.string,
  value: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  usesInputGroup: React.PropTypes.bool,
  preAddOn: React.PropTypes.string,
  postAddOn: React.PropTypes.string,
  controlStyle: React.PropTypes.object,
  inlineHelpBlock: React.PropTypes.string,
  helpBlock: React.PropTypes.string,
  formGroupStyle: React.PropTypes.object,
  required:React.PropTypes.bool

};

ValidatedFormGroup.defaultProps = {
  componentClass:'input',
  usesInputGroup:false,
  required:false,
  controlId:'',
  type:'text'
};

export default ValidatedFormGroup;