/**
 * Created by cantgetnosleep on 10/7/16.
 */


import React, { Component } from 'react';
import {
  ControlLabel,
  HelpBlock
} from './BaseFormElements';

import RequiredMarker from './RequiredMarker';

const InlineHelpBlock = ({text}) => (
  <HelpBlock className="inline-help-block">{"( " + text + " )"}</HelpBlock>
);

const SwitchLabel = ({
  label,
  validationMessage,
  inlineHelpBlock,
  required,
  controlId
}) => {

  if (label == null) {
    return null
  }
  else if (validationMessage) {
    return (
      <ControlLabel htmlFor={controlId}><RequiredMarker required={required}/>{`${label} ( ${validationMessage} )`}</ControlLabel>
    );
  }
  else if (inlineHelpBlock) {
    return (
      <ControlLabel htmlFor={controlId}><RequiredMarker required={required}/>{label}<InlineHelpBlock text={inlineHelpBlock} /></ControlLabel>
    );
  }
  else {
    return (
      <ControlLabel htmlFor={controlId}><RequiredMarker required={required}/>{label}</ControlLabel>
    );
  }
};

SwitchLabel.propTypes = {
  label: React.PropTypes.string.isRequired,
  validationMessage: React.PropTypes.string,
  validationState: React.PropTypes.string,
  inlineHelpBlock: React.PropTypes.string,
  controlId: React.PropTypes.string,
  required: React.PropTypes.bool
};

SwitchLabel.defaultProps = {
  validationMessage: null,
  validationState: null,
  inlineHelpBlock: null,
  required: false
};

export default SwitchLabel;