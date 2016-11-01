/**
 * Created by cantgetnosleep on 10/25/16.
 */

import { shallow, mount, render } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import {prettyPrintHtmlFromWrapper, simulateChange} from './testutils';

import React from 'react';

import {
  ValidatedFormGroup,
  MKFormAssistant,
  Alert,
  SelectBox,
  TagInput,
  CheckboxGroup2Column,
  ContactInfo
} from '../src';

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
} from '../src/components/BaseFormElements';


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
      required: false,
      validate: ContactInfo.validatePhone,
      inputTransformer: ContactInfo.normalizePhone,
      default: ''
    },
    email: {
      required: false,
      validate: ContactInfo.validateEmail,
      default: ''
    },
    name: {
      required: false,
      default: '',
      validate: (value) => {
        if (value.toLowerCase() != value) {
          return {state:'error', message:"Lowercase please!"};
        }
        else {
          return {state:'success', message:null};
        }
      },
      postChangeHook: (value, set, newState) => {
        if (value == 'testme') { // completely artificial hook for testing
          set('success');
          set(true, 'arbitraryPath');
        }
      }
    },
    visibility: {
      required: false,
      default: 'attendees'
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

describe('TestForm + FormAssistant state and props', () => {

  const wrapper = mount(<TestForm />);
  let testForm = wrapper.instance();
  let formAssistant = testForm.formAssistant;

  it('can set up initial state from form description', () => {

    let formProps = testForm.formProps;

    expect(formProps.name.required).toBe(true);
    expect(formProps.affiliation.required).toBe(true);
    expect(formProps.contact1).toBeDefined();
    expect(formProps.contact1.isGroup).toBeTruthy();

    expect(formProps.contact1.phone.required).toBeDefined();
    expect(formProps.contact1.email.required).toBeDefined();
    expect(formProps.contact1.name.required).toBeDefined();
    expect(formProps.contact1.visibility.required).toBeDefined();

    expect(formProps.contact1.phone.required).toBe(false);
    expect(formProps.contact1.email.required).toBe(false);
    expect(formProps.contact1.name.required).toBe(false);
    expect(formProps.contact1.visibility.required).toBe(false);

    expect(typeof formProps.handleSubmit === "function").toBeTruthy();
    expect(typeof formProps.affiliation.handleChange === "function").toBeTruthy();
    expect(typeof formProps.contact1.phone.handleChange === "function").toBeTruthy();
    expect(typeof formProps.contact1.email.handleChange === "function").toBeTruthy();
    expect(typeof formProps.contact1.name.handleChange === "function").toBeTruthy();
    expect(typeof formProps.contact1.visibility.handleChange === "function").toBeTruthy();


    expect(formAssistant.callbacks.name.validate).toBe(formDescription.name.validate);
    expect(formAssistant.callbacks.affiliation.validate).toBeDefined();
    expect(formAssistant.callbacks.contact1.phone.validate).toBe(ContactInfo.validatePhone);
    expect(formAssistant.callbacks.contact1.email.validate).toBe(ContactInfo.validateEmail);

    expect(formAssistant.callbacks.contact1.phone.inputTransformer).toBe(ContactInfo.normalizePhone);

    expect(formAssistant.defaultValues.name).toBe("Your Name");

    let state = wrapper.state();

    expect(state.name.value).toBe("Your Name");
    expect(state.affiliation.value).toBe("");
    expect(state.contact1.name.value).toBe("");
    expect(state.contact1.email.value).toBe("");
    expect(state.contact1.phone.value).toBe("");
    expect(state.contact1.visibility.value).toBe("attendees");

    expect(state.name.validationState).toBe(null);
    expect(state.affiliation.validationState).toBe(null);
    expect(state.contact1.name.validationState).toBe(null);
    expect(state.contact1.email.validationState).toBe(null);
    expect(state.contact1.phone.validationState).toBe(null);
    expect(state.contact1.visibility.validationState).toBe(null);

    expect(state.name.validationMessage).toBe(null);
    expect(state.affiliation.validationMessage).toBe(null);
    expect(state.contact1.name.validationMessage).toBe(null);
    expect(state.contact1.email.validationMessage).toBe(null);
    expect(state.contact1.phone.validationMessage).toBe(null);
    expect(state.contact1.visibility.validationMessage).toBe(null);

    expect(state.name.visible).toBe(true);
    expect(state.affiliation.visible).toBe(true);
    expect(state.contact1.name.visible).toBe(true);
    expect(state.contact1.email.visible).toBe(true);
    expect(state.contact1.phone.visible).toBe(true);
    expect(state.contact1.visibility.visible).toBe(true);

  });
});

describe('TestForm + FormAssistant state and props', () => {

  const wrapper = mount(<TestForm />);
  let testForm = wrapper.instance();
  let formAssistant = testForm.formAssistant;

  it('can change values of name', () => {
    formAssistant.handleChange('name', 'My Name');
    expect(wrapper.state('name').value).toEqual("My Name");
  });


  it('can change values of group items', () => {

    formAssistant.handleChange('contact1.name', 'Anew Name');
    expect(wrapper.state('contact1').name.value).toEqual('Anew Name');

    formAssistant.handleChange('contact1.phone', '512-777-8888');
    expect(wrapper.state('contact1').phone.value).toEqual('512-777-8888');

    formAssistant.handleChange('contact1.email', 'test@email.com');
    expect(wrapper.state('contact1').email.value).toEqual('test@email.com');

    formAssistant.handleChange('contact1.visibility', 'registered');
    expect(wrapper.state('contact1').visibility.value).toEqual('registered');

  });

  it('can change values of group items', () => {

    simulateChange(wrapper.find('#contact1Name'), 'Another Name');
    expect(wrapper.state('contact1').name.value).toEqual('Another Name');

    simulateChange(wrapper.find('#contact1Phone'), '123-456-7890');
    expect(wrapper.state('contact1').phone.value).toEqual('123-456-7890');

    simulateChange(wrapper.find('#contact1Email'), 'bob@bob.com');
    expect(wrapper.state('contact1').email.value).toEqual('bob@bob.com');

    simulateChange(wrapper.find('#contact1Visibility'), 'notarealvalue');
    expect(wrapper.state('contact1').visibility.value).toEqual('notarealvalue');

  });

  it('can validate values of group items', () => {

    simulateChange(wrapper.find('#contact1Name'), 'Abc Def');
    expect(wrapper.state('contact1').name.value).toEqual('Abc Def');
    expect(wrapper.state('contact1').name.validationState).toEqual('error');
    expect(wrapper.state('contact1').name.validationMessage).toEqual('Lowercase please!');

    simulateChange(wrapper.find('#contact1Name'), 'abc def');
    expect(wrapper.state('contact1').name.value).toEqual('abc def');
    expect(wrapper.state('contact1').name.validationState).toEqual('success');
    expect(wrapper.state('contact1').name.validationMessage).toEqual(null);

  });


  it('can transform input of group items', () => {

    simulateChange(wrapper.find('#contact1Phone'), '1234567890');
    expect(wrapper.state('contact1').phone.value).toEqual('123-456-7890');
    expect(wrapper.state('contact1').phone.validationState).toEqual('success');
    expect(wrapper.state('contact1').phone.validationMessage).toEqual(null);

  });

  it('can transform input of group items', () => {

    simulateChange(wrapper.find('#contact1Name'), 'testme');
    expect(wrapper.state('contact1').name.value).toEqual('success');
    expect(wrapper.state('arbitraryPath')).toEqual(true);

  });
});
