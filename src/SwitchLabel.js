/**
 * Created by cantgetnosleep on 10/7/16.
 */


import React, { Component } from 'react';
import {
  ControlLabel,
  HelpBlock
} from '@sketchpixy/rubix';

import RequiredMarker from './RequiredMarker';

const InlineHelpBlock = ({text}) => (
  <HelpBlock className="inline-help-block">{"( " + text + " )"}</HelpBlock>
);

const SwitchLabel = ({label, validationMessage, inlineHelpBlock, required}) => {

  if (validationMessage) {
    return (
      <ControlLabel><RequiredMarker required={required}/>{`${label} ( ${validationMessage} )`}</ControlLabel>
    );
  }
  else if (inlineHelpBlock) {
    return (
      <ControlLabel><RequiredMarker required={required}/>{label}<InlineHelpBlock text={inlineHelpBlock} /></ControlLabel>
    );
  }
  else {
    return (
      <ControlLabel><RequiredMarker required={required}/>{label}</ControlLabel>
    );
  }
};

SwitchLabel.propTypes = {
  label: React.PropTypes.string.isRequired,
  validationMessage: React.PropTypes.string,
  inlineHelpBlock: React.PropTypes.string,
  required: React.PropTypes.bool
};

SwitchLabel.defaultProps = {
  validationMessage: null,
  inlineHelpBlock: null,
  required: false
};

export default SwitchLabel;