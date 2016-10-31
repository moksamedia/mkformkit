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
            {..._.merge({}, this.formProps.name, this.state.name)}
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
            {..._.merge({}, this.formProps.affiliation, this.state.affiliation)}
          />

          <ContactInfo
            title="Contact 1"
            identifier="contact1"
            {..._.merge({}, this.formProps.contact1, this.state.contact1)}
          />

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
