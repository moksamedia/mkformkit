/**
 * Created by cantgetnosleep on 10/6/16.
 */


import React, { Component } from 'react';
import ValidatedFormGroup from './ValidatedFormGroup';
import {Well, FormGroup, ControlLabel, FormControl} from '@sketchpixy/rubix';

import Utils from '@moksa/utils'

let {validatePhoneNumber, normalizePhoneNumber, phoneTypes} = Utils.PhoneUtils;

let {email_regex} = Utils.Regexes;

class ContactInfo extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: {
        value:'',
        validationState:null,
        validationMessage:''
      },
      email: {
        value:'',
        validationState:null,
        validationMessage:''
      },
      name: {
        value:'',
        validationState:null,
        validationMessage:''
      },
      visibility:'attendees'
    }
  }

  handleChangePhoneNumber(e) {

    var value = e.target.value;

    if (value == '') {
      this.setState({phoneNumber: {
        value:'',
        validationState:null,
        validationMessage:null
      }});

      this.props.handleChange({
        phone:null,
        validationState:null
      }, this.props.identifier);
      return;
    }

    var phoneNumberNormalized = normalizePhoneNumber(value);

    if(validatePhoneNumber(phoneNumberNormalized)) {

      this.setState({phoneNumber: {
        value:phoneNumberNormalized,
        validationState:'success',
        validationMessage:null
      }});

      this.props.handleChange({
        phone:phoneNumberNormalized,
        validationState:'success'
      }, this.props.identifier)

    }
    else {

      this.setState({phoneNumber: {
        value:value,
        validationState:'error',
        validationMessage:'That does not appear to be a valid phone number.'
      }});

    }
  }

  // NAME

  handleChangeName(e) {

    var value = e.target.value;

    this.setState({
      name: {
        value:value,
        validationState:'success',
        validationMessage:null
    }});

    this.props.onChange({
        name:value
      }, this.props.identifier);

  }

  // EMAIL

  handleChangeEmail(e) {

    var value = e.target.value;

    // if empty
    if (value == '') {

      this.setState({
        email: {
          value:'',
          validationState:null,
          validationMessage:null
      }});

      this.props.handleChange({
        email:null
      }, this.props.identifier);

      return;
    }

    // if valid email
    if (email_regex.test(value)) {

      this.setState({
        email: {
          value:value,
          validationState:'success',
          validationMessage:null
      }});

      this.props.handleChange({
          email:value,
          validationState:'success'
      }, this.props.identifier);
    }

    // if not valid email
    else {

      this.setState({
        email: {
          value:value,
          validationState:'error',
          validationMessage:'That does not appear to be a valid email.'
      }});

      this.props.handleChange({
        email:null,
        validationState:'error'
      }, this.props.identifier);

    }
  }

  // VISIBILITY

  handleChangeVisibility(e) {

    var value = e.target.value;

    this.setState({visibility: value});

    this.props.handleChange({
      visibility:value
    }, this.props.identifier);

  }

  render() {

    let {
      identifier,
      title
    } = this.props;

    return (

      <Well>

        <h4>{title}</h4>

        <ValidatedFormGroup
          controlId={identifier+'Name'}
          label="Name"
          placeHolder="Who you gonna call?"
          {...this.state.name}
          handleChange={(e) => {
            this.handleChangeName(e);
          }}
        />
        <ValidatedFormGroup
          controlId={identifier+'Phone'}
          label="Phone number"
          placeHolder="444-333-1212"
          {...this.state.phoneNumber}
          handleChange={(e) => {
            this.handleChangePhoneNumber(e);
          }}
        />
        <ValidatedFormGroup
          controlId={identifier+'Email'}
          label="Email"
          placeHolder="email@domain.com"
          {...this.state.email}
          handleChange={(e) => {
            this.handleChangeEmail(e);
          }}
        />

        <FormGroup controlId={identifier+'Visibility'} onChange={::this.handleChangeVisibility}>
          <ControlLabel>Decide who can see {title}</ControlLabel>
          <FormControl componentClass="select" placeholder="select" defaultValue="attendees">
            <option value="anyone">Anyone. Contact info is public. (Watch our for spam)</option>
            <option value="registered">Registered users with a validated email.</option>
            <option value="applicantsAndAttendees">Applicants and people accepted into the retreat.</option>
            <option value="attendees">Only people who have been accepted into the retreat.</option>
            <option value="byrequest">Shared by request only.</option>
          </FormControl>
        </FormGroup>

      </Well>
    );
  };
}

ContactInfo.propTypes = {
  title:React.PropTypes.string.isRequired,
  identifier:React.PropTypes.string.isRequired,
  handleChange:React.PropTypes.func.isRequired
}

export default ContactInfo;