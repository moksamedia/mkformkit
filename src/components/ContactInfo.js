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
    console.log("props="+JSON.stringify(props));
    this.state = {
      phone: props.phone.value,
      email: props.email.value,
      name: props.name.value,
      visibility: props.visibility.value
    }
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

        <SwitchLabel {...this.props} label={title}/>

        <ValidatedFormGroup
          controlId={identifier+'Name'}
          label="Name"
          placeHolder="Who you gonna call?"
          {...this.state.name}
          {...this.props.name}
        />
        <ValidatedFormGroup
          controlId={identifier+'Phone'}
          label="Phone number"
          placeHolder="444-333-1212"
          {...this.state.phone}
          {...this.props.phone}
        />
        <ValidatedFormGroup
          controlId={identifier+'Email'}
          label="Email"
          placeHolder="email@domain.com"
          {...this.state.email}
          {...this.props.email}
        />

        <SelectBox
          controlId={identifier+'Visibility'}
          label={`Decide who can see ${identifier}`}
          addNotAnswered={true}
          items={[
            {value:"anyone", text:"Anyone. Contact info is public. (Watch our for spam)"},
            {value:"registered", text:"Registered users with a validated email."},
            {value:"applicantsAndAttendees", text:"Applicants and people accepted into the retreat."},
            {value:"attendees", text:"Only people who have been accepted into the retreat."},
            {value:"byrequest", text:"Shared by request only."},
          ]}
          {...this.state.visibility}
          {...this.props.visibility}
        />

      </Well>
    );
  };
}

ContactInfo.propTypes = {
  title:React.PropTypes.string.isRequired,
  identifier:React.PropTypes.string.isRequired,
  visible:React.PropTypes.bool
};

ContactInfo.defaultProps = {
  visible:true
};

export default ContactInfo;