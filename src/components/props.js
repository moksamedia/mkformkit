/**
 * Created by cantgetnosleep on 10/28/16.
 */

import React from 'react';

let COMMON_PROPS = {
  types: {
    // required
    controlId: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    // optional
    required: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    validationState: React.PropTypes.string,
    validationMessage: React.PropTypes.string,
    helpBlock: React.PropTypes.string,
    inlineHelpBlock: React.PropTypes.string,
    formGroupClass: React.PropTypes.string,
    formGroupId: React.PropTypes.string
  },
  defaults: {
    visible: true
  }
};

export default COMMON_PROPS;
