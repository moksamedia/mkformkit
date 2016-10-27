/**
 * Created by cantgetnosleep on 10/9/16.
 */

import React, { Component } from 'react';
import {
  FormGroup,
  FormControl
} from '@sketchpixy/rubix';

import SwitchLabel from './SwitchLabel';

const SelectBox = (props) => {

  let {
    controlId,
    handleChange,
    items,
    label,
    required,
    validationMessage,
    inlineHelpBlock,
    componentClass,
    formGroupStyle,
    controlStyle,
    addNotAnswered
  } = props;

  let labelProps = [label, required, validationMessage, inlineHelpBlock];

  return(
    <FormGroup controlId={controlId} onChange={handleChange} style={formGroupStyle}>
      <SwitchLabel {...props} />
      <FormControl componentClass={"select" + (componentClass ? " "+ componentClass : "")} placeholder="select" style={controlStyle}>
        { addNotAnswered ?
          <option key="notAnswered" value="notAnswered">...</option>
        : null }
        {items.map((item) => (
          <option key={item.value} value={item.value}>{item.text}</option>
        ))}
      </FormControl>
    </FormGroup>
  );
};

SelectBox.propTypes = {
  controlId: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  required: React.PropTypes.bool,
  validationMessage: React.PropTypes.string,
  inlineHelpBlock: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  formGroupStyle: React.PropTypes.string,
  controlStyle: React.PropTypes.string,
  addNotAnswered: React.PropTypes.bool
};

SelectBox.defaultProps = {
  required: false,
  addNotAnswered: false
};

export default SelectBox;