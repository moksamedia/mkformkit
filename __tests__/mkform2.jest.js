/**
 * Created by cantgetnosleep on 10/25/16.
 */

import { shallow, mount, render } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import React from 'react';

import {ValidatedFormGroup, MKFormAssistant, Alert} from '../src';

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

  description: {
    validate: (value) => {
      if (value.length < 10) return {state:'error', message:'Doh!'};
      else return {state:'success', message:null};
    },
    required: false,
    default: '',
    inputTransformer: (value) => {
      return value.toUpperCase();
    }
  },

  tags: {
    required:false
  },

  eventVisibility: {
    required:true
  },

  affiliation: {
    required:true
  }

};


class TestForm extends React.Component {

  constructor(props) {
    super(props);
    new MKFormAssistant(formDescription, this);
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
      <Grid>
        <Row>
          <Col sm={12} smOffset={0} md={10} mdOffset={1}>
            <PanelContainer id="retreat-create-panel" controls={false}>
              <Panel>
                <PanelBody style={{padding: 30}}>

                  <Form id='retreat-create-form'>

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

                      <ValidatedFormGroup
                        label="Description"
                        inlineHelpBlock="Describe the experience in a couple paragraphs."
                        placeHolder="This event is going to be..."
                        componentClass="textarea"
                        controlStyle={{height: "20em"}}
                        {...this.formProps.description}
                        {...this.state.description}
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
                        {...props.eventVisibility}
                      />

                      <TagInput
                        controlId="tags"
                        label="Sub-Affiliation"
                        helpBlock="These are searchable tags."
                        {...props.tags}
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
                        {...props.affiliation}
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
                </PanelBody>
              </Panel>
            </PanelContainer>
          </Col>
        </Row>
      </Grid>
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
    expect(formProps.location.required).toBe(false);
    expect(formProps.description.required).toBe(false);

    expect(typeof formProps.handleSubmit === "function").toBeTruthy();
    expect(typeof formProps.name.handleChange === "function").toBeTruthy();
    expect(typeof formProps.description.handleChange === "function").toBeTruthy();
    expect(typeof formProps.location.handleChange === "function").toBeTruthy();


    expect(formAssistant.callbacks.name.validate).toBe(formDescription.name.validate);
    expect(formAssistant.callbacks.description.validate).toBe(formDescription.description.validate);
    expect(formAssistant.callbacks.location.validate).toBe(null);

    expect(formAssistant.defaultValues.name).toBe("Your Name");
    expect(formAssistant.defaultValues.description).toBe("");
    expect(formAssistant.defaultValues.location).toBe("");

  });

  it('can change values in both formAssitant.formState and component.state', () => {
    formAssistant.handleChange('name', 'My Name');
    expect(wrapper.state('name').value).toEqual("My Name");
  });

  it('post change hooks works with set(value)', () => {
    formAssistant.handleChange('location', 'MixedCaseTOWN');
    expect(wrapper.state('location').value).toEqual("mixedcasetown");
  });


  it('post change hooks works with set(value, path)', () => {
    formAssistant.handleChange('message', 'Hello');
    expect(wrapper.state('location').value).toEqual("I'm setting the location value");
    expect(wrapper.state('message').value).toEqual("Hello");
  });

  it('can validate values', () => {

    // Too short, error
    formAssistant.handleChange('name', 'Abc');
    expect(wrapper.state('name').value).toEqual("Abc");
    expect(wrapper.state('name').validationState).toEqual("error");
    expect(wrapper.state('name').validationMessage).toEqual("Too short!");

    // OK
    formAssistant.handleChange('name', 'Alongenough Name');
    expect(wrapper.state('name').value).toEqual("Alongenough Name");
    expect(wrapper.state('name').validationState).toEqual("success");
    expect(wrapper.state('name').validationMessage).toBe(null);

  });

  it('can transform inputs with an input transformer', () => {

    formAssistant.handleChange('description', 'hello');
    expect(wrapper.state('description').value).toBe("HELLO");

  });

  it('merges other state', () => {

    expect(wrapper.state('shouldShow')).toEqual({
      visible: true,
      someVal: "It's a trap!"
    });

    expect(wrapper.state('submitted')).toEqual({
      data: null,
      isSubmitted: false
    });

  });

  it('postChangeHook set() can update merged other state values', () => {

    formAssistant.handleChange('other', "it just doesn't matter");
    expect(wrapper.state('shouldShow').visible).toBe(false);

  });


});


let simulateChange = (component, value) => {
  component.simulate('change', {target: {value: value}});
};

describe('TestForm: on change handlers', () => {

  const wrapper = mount(<TestForm />);
  let testForm = wrapper.instance();
  let formAssistant = testForm.formAssistant;

  it('Can call onChange event to update state', () => {

    let name = wrapper.find('#name');

    simulateChange(name, "Andrew Hughes");
    expect(name.get(0).value).toEqual("Andrew Hughes");

    let description = wrapper.find('#description');

    simulateChange(description, "What a wonderful world");
    expect(description.get(0).value).toBe("WHAT A WONDERFUL WORLD");

    let location = wrapper.find('#location');

    simulateChange(location, "Bobville, Colorado");
    expect(location.get(0).value).toBe("bobville, colorado");

    wrapper.find('.submit').simulate('click');

    expect(testForm.submitted).toEqual({ name: 'Andrew Hughes',
      description: 'WHAT A WONDERFUL WORLD',
      location: 'bobville, colorado',
      message: '',
      other: ''
    });

  });


});
