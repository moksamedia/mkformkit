/**
 * Created by cantgetnosleep on 10/29/16.
 */

import React, { Component } from 'react';

import {
  Alert as FormAlert
} from './BaseFormElements';

class Alert extends FormAlert {

  render() {

    let {
      controlId,
      controlClass,
      message,
      visible,
      style
    } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <FormAlert id={controlId} bsClass={controlClass} bsStyle={style}>
        <strong style={{paddingRight:10}}>{preMessage}</strong><span>{message}</span>
      </FormAlert>
    );

  }

}

Alert.propTypes = {
  controlId: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  preMessage: React.PropTypes.string,
  controlClass: React.PropTypes.string,
  visible: React.PropTypes.bool,
  style: React.PropTypes.string,
};

Alert.defaultProps = {
  visible: false,
  style: 'warning',
  preMessage: 'Ooops!',
  message: ''
};

export default Alert;
