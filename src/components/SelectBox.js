/**
 * Created by cantgetnosleep on 10/9/16.
 */

import React, { Component } from 'react';

import COMMON_PROPS from './props';

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
    validationState,
    visible
  } = props;

  if (!visible) {
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

SelectBox.propTypes = Object.assign({}, COMMON_PROPS.types, {
  items: React.PropTypes.array.isRequired,
  controlStyle: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  formGroupStyle: React.PropTypes.string,
  addNotAnswered: React.PropTypes.bool
});

SelectBox.defaultProps = Object.assign({}, COMMON_PROPS.defaults, {
  addNotAnswered: false
});

export default SelectBox;