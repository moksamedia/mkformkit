/**
 * Created by cantgetnosleep on 10/6/16.
 */


import React, { Component } from 'react';
import ValidatedFormGroup from './ValidatedFormGroup';
import SwitchLabel from './SwitchLabel';
import SelectBox from './SelectBox';

import {Well, FormGroup, ControlLabel, FormControl} from './BaseFormElements';

import Utils from '../utils'

let {validatePhoneNumber, normalizePhoneNumber} = Utils.PhoneUtils;

let {email_regex} = Utils.Regexes;

class ContactInfo extends Component  {

  constructor(props) {
    super(props);
  }

  static validatePhone(phone) {
    if (validatePhoneNumber(phone)) {
      return {state:'success', message:null}
    }
    else {
      return {state:'error', message:'That does not appear to be a valid phone number.'}
    }
  }

  static normalizePhone(phone) {
    return normalizePhoneNumber(phone);
  }

  static validateEmail(email) {
    if (email_regex.test(email)) {
      return {state:'success', message:null}
    }
    else {
      return {state:'error', message:'That does not appear to be a valid email.'}
    }
  }

  render() {

    if (!this.props.visible) {
      return null;
    }

    let {
      identifier,
      title
    } = this.props;

    return (

      <Well>

        <SwitchLabel {...this.props}/>

        <ValidatedFormGroup
          controlId={identifier+'Name'}
          label="Name"
          placeHolder="Who you gonna call?"
          {...this.props.name}
        />
        <ValidatedFormGroup
          controlId={identifier+'Phone'}
          label="Phone number"
          placeHolder="444-333-1212"
          {...this.props.phone}
        />
        <ValidatedFormGroup
å         label="Email"
          controlId={identifier+'Email'}
          placeHolder="email@domain.com"
          {...this.props.email}
        />

        {this.props.children}

      </Well>
    );
  };
}

ContactInfo.propTypes = {
  label:React.PropTypes.string.isRequired,
  identifier:React.PropTypes.string.isRequired,
  visible:React.PropTypes.bool
};

ContactInfo.defaultProps = {
  visible:true
};

export default ContactInfo;