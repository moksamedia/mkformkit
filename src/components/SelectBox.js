/**
 * Created by cantgetnosleep on 10/9/16.
 */

import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  HelpBlock
} from './BaseFormElements';

import SwitchLabel from './SwitchLabel';

const SelectBox = (props) => {

  let {
    controlId,
    handleChange,
    items,
    helpBlock,
    componentClass,
    formGroupStyle,
    controlStyle,
    addNotAnswered,
    formGroupClass,
    formGroupId,
    validationState
  } = props;

  if (!props.visible) {
    return null;
  }
  else {

    return(

      <FormGroup controlId={controlId} onChange={handleChange} style={formGroupStyle} bsClass={formGroupClass} id={formGroupId} validationState={validationState} >
        <SwitchLabel {...props} />
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
        <FormControl componentClass={"select" + (componentClass ? " "+ componentClass : "")} placeholder="select" style={controlStyle}>
          { addNotAnswered ?
            <option className="notAnswered" key="notAnswered" value="notAnswered">...</option>
            : null }
          {items.map((item) => (
            <option key={item.value} value={item.value}>{item.text}</option>
          ))}
        </FormControl>
      </FormGroup>

    );

  }

};

SelectBox.propTypes = {
  // required
  controlId: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  //optional
  required: React.PropTypes.bool,
  inlineHelpBlock: React.PropTypes.string,
  helpBlock: React.PropTypes.string,
  addNotAnswered: React.PropTypes.bool,
  visible: React.PropTypes.bool,
  validationState: React.PropTypes.string,
  validationMessage: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  formGroupId: React.PropTypes.string,
  formGroupClass: React.PropTypes.string,
  controlStyle: React.PropTypes.string,
  formGroupStyle: React.PropTypes.string,
};

SelectBox.defaultProps = {
  addNotAnswered: false,
  visible: true
};

export default SelectBox;