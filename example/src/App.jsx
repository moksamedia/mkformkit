import React, {Component} from 'react';

import _ from 'lodash';

import {
  ValidatedFormGroup,
  MKFormAssistant,
  Alert,
  SelectBox,
  TagInput,
  CheckboxGroup2Column,
  ContactInfo
} from '../../src';

import {
  Form,
  FormGroup,
  Button,
  PanelContainer,
  Panel,
  PanelBody,
  Row,
  Grid,
  Col,
  Well
} from '../../src/components/BaseFormElements';

let formDescription = {

  name: {
    validate: (value) => {
      if (value.length > 5) {
        return {state:'success', message:null};
      }
      else {
        return {state:'error', message:"Too short!"};
      }
    },
    required: true,
    default: 'Your Name'
  },

  affiliation: {
    required:true
  },

  contact1: {
    isGroup:true,
    phone: {
      required: true,
      validate: ContactInfo.validatePhone,
      inputTransformer: ContactInfo.normalizePhone
    },
    email: {
      required: false,
      validate: ContactInfo.validateEmail
    },
    name: {
      required: false,
    },
    visibility: {
      required: false,
    }
  }

};


class TestForm extends React.Component {

  constructor(props) {
    super(props);
    this.formAssistant = new MKFormAssistant(formDescription, this);
    this.submitted = {};
  }

  handleSubmit(status, data) {

    if (status.success) {
      // for testing purposes
      this.submitted = data;
    }
    else {

    }

  };

  render() {

    return (
      <Form id='create-form'>

        {/*
         GENERAL INFO
         */}

        <h3>General Info</h3>
        <Well>

          {/* RETREAT NAME */}
          <ValidatedFormGroup
            label="Name"
            placeHolder="Choose a public name for your retreat"
            {...this.formProps.name.getMergedStateAndProps()}
          />

          <CheckboxGroup2Column
            controlId="affiliation"
            label="Pick an affiliation"
            items={[
              {value: "a", text: "A"},
              {value: "b", text: "B"},
              {value: "c", text: "C"},
              {value: "d", text: "D"}
            ]}
            {...this.formProps.affiliation.getMergedStateAndProps()}
          />

          <ContactInfo
            label="Contact 1"
            identifier="contact1"
            {...this.formProps.contact1.getMergedStateAndProps()}
          >
            <SelectBox
              controlId={'contact1Visibility'}
              label={`Decide who can see contact 1`}
              addNotAnswered={true}
              items={[
                {value:"anyone", text:"Anyone. Contact info is public. (Watch our for spam)"},
                {value:"registered", text:"Registered users with a validated email."},
                {value:"applicantsAndAttendees", text:"Applicants and people accepted into the retreat."},
                {value:"attendees", text:"Only people who have been accepted into the retreat."},
                {value:"byrequest", text:"Shared by request only."},
              ]}
              {...this.formProps.contact1.visibility.getMergedStateAndProps()}
            />
          </ContactInfo>

        </Well>

        <Alert
          controlId="alert"
          style="warning"
          {...this.state.alert}
        />

        <FormGroup controlId="retreatCreateFormSubmit">
          <Button className="submit" type="submit" onClick={this.formProps.handleSubmit}>
            Submit
          </Button>
        </FormGroup>

      </Form>
    )
  }

};

class App extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
        <TestForm/>
      </div>
    );
  }
}
export default App;
