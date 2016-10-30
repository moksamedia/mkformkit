/**
 * Created by cantgetnosleep on 10/25/16.
 */

import { shallow, mount, render } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import React from 'react';

import {
  ValidatedFormGroup,
  MKFormAssistant,
  Alert,
  SelectBox,
  TagInput,
  CheckboxGroup2Column
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

import {prettyPrintHtmlFromWrapper} from './testutils';

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

  tags: {
    validate: (value) => {
      if (value.length > 1) {
        return {state:'success', message:null};
      }
      else {
        return {state:'error', message:"Must include at least 2 tags"};
      }
    },
    required:true,
    visible: true
  },

  eventVisibility: {
    required:false,
    default:'notAnswered'
  },

  affiliation: {
    required:true
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
            {...this.formProps.name}
            {...this.state.name}
          />

          <SelectBox
            controlId="eventVisibility"
            label="Pick who can see the event."
            addNotAnswered={true}
            items={[
              {value:"anyone", text:"Anyone on the website, including anonymous users (contact info will still be hidden)"},
              {value:"registered", text:"Registered users only"},
              {value:"link", text:"Only people with a direct link"},
              {value:"invite", text:"Only registered users that I've invited"},
            ]}
            {...this.formProps.eventVisibility}
            {...this.state.eventVisibility}
          />

          <TagInput
            controlId="tags"
            label="Sub-Affiliation"
            helpBlock="These are searchable tags."
            {...this.formProps.tags}
            {...this.state.tags}
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
            {...this.formProps.affiliation}
            {...this.state.affiliation}
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


describe('TestForm + FormAssistant state and props', () => {

  const wrapper = mount(<TestForm />);
  let testForm = wrapper.instance();
  let formAssistant = testForm.formAssistant;

  it('can set up initial state from form description and other state', () => {

    let formProps = testForm.formProps;

    expect(formProps.name.required).toBe(true);
    expect(formProps.tags.required).toBe(true);
    expect(formProps.eventVisibility.required).toBe(false);
    expect(formProps.affiliation.required).toBe(true);

    expect(typeof formProps.handleSubmit === "function").toBeTruthy();
    expect(typeof formProps.name.handleChange === "function").toBeTruthy();
    expect(typeof formProps.tags.handleChange === "function").toBeTruthy();
    expect(typeof formProps.eventVisibility.handleChange === "function").toBeTruthy();
    expect(typeof formProps.affiliation.handleChange === "function").toBeTruthy();

    expect(formAssistant.callbacks.name.validate).toBe(formDescription.name.validate);
    expect(formAssistant.callbacks.tags.validate).toBe(formDescription.tags.validate);
    expect(formAssistant.callbacks.eventVisibility.validate).toBe(null);
    expect(formAssistant.callbacks.affiliation.validate).toBe(null);

    expect(formAssistant.defaultValues.name).toBe("Your Name");

  });

  it('can change values of name', () => {
    formAssistant.handleChange('name', 'My Name');
    expect(wrapper.state('name').value).toEqual("My Name");
  });

  it('can change values of tags', () => {

    formAssistant.handleChange('tags', ['tag1', 'tag2', 'tag3']);
    expect(wrapper.state('tags').value).toEqual(['tag1', 'tag2', 'tag3']);

    formAssistant.handleChange('tags', ['ABC', 'DEF']);
    expect(wrapper.state('tags').value).toEqual(['ABC', 'DEF']);

  });

  it('can change values of select box', () => {

    expect(wrapper.state('eventVisibility').value).toEqual('notAnswered');

    formAssistant.handleChange('eventVisibility', 'registered');
    expect(wrapper.state('eventVisibility').value).toEqual('registered');

    formAssistant.handleChange('eventVisibility', 'invite');
    expect(wrapper.state('eventVisibility').value).toEqual('invite');
  });

  it('can change values of checkbox', () => {

    expect(wrapper.state('affiliation').value).toBeUndefined();

    formAssistant.handleChange('affiliation', ['a','b']);
    expect(wrapper.state('affiliation').value).toEqual(['a','b']);

  });

  it('can validate tags', () => {

    formAssistant.handleChange('tags', ['tag1']);
    expect(wrapper.state('tags').validationState).toEqual('error');
    expect(wrapper.state('tags').validationMessage).toEqual("Must include at least 2 tags");

    formAssistant.handleChange('tags', ['tag1', 'tag2']);
    expect(wrapper.state('tags').validationState).toEqual('success');
    expect(wrapper.state('tags').validationMessage).toEqual(null);

  });
  
});