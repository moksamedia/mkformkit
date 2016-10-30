/**
 * Created by cantgetnosleep on 10/25/16.
 */

import pretty from 'pretty';

import { shallow, mount, render } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import React from 'react';

import {
  CheckboxGroup,
  CheckboxGroup2Column,
  RadioGroup,
  ValidatedFormGroup,
  SelectBox,
  TagInput
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


let stripHtmlComments = (html) => {
  return html.replace(/<!--(.*?)-->/gm, "");
};

let prettyPrintHtmlFromWrapper = (wrapper, strip = true) => {
  if (strip) {
    console.log(pretty(stripHtmlComments(wrapper.html())));
  }
  else {
    console.log(pretty(wrapper.html()));
  }
};

let checkNotVisible = (wrapper) => {
  expect(wrapper.html()).toBeFalsy();
};

let checkIsRequired = (wrapper) => {
  expect(wrapper.find('.requiredControl')).toBeTruthy();
};

let checkNotRequired = (wrapper) => {
  expect(wrapper.find('.requiredControl').length).toBe(0);
};

let checkHasValidationError = (wrapper) => {
  expect(wrapper.find('.myClass').hasClass('has-error')).toBeTruthy();
};

let checkHasValidationWarning = (wrapper) => {
  expect(wrapper.find('.myClass').hasClass('has-warning')).toBeTruthy();
};

let checkHasValidationSuccess= (wrapper) => {
  expect(wrapper.find('.myClass').hasClass('has-success')).toBeTruthy();
};

let checkHasNoValidationClass = (wrapper) => {
  expect(wrapper.find('.myClass').hasClass('has-success')).toBeFalsy();
  expect(wrapper.find('.myClass').hasClass('has-error')).toBeFalsy();
  expect(wrapper.find('.myClass').hasClass('has-warning')).toBeFalsy();
};

let checkValidationMessageContains = (wrapper, text) => {
  expect(wrapper.find('label.control-label').first().text()).toContain(text);
};

let checkHelpBlock = (wrapper, text) => {
  expect(wrapper.find('.help-block').length).toBe(1);
  expect(wrapper.find('.help-block').text()).toContain(text);
};

let checkInlineHelpBlock = (wrapper, text) => {
  expect(wrapper.find('.inline-help-block').length).toBe(1);
  expect(wrapper.find('.inline-help-block').text()).toContain(text);
};

let simulateChange = (component, value) => {
  component.simulate('change', {target: {value: value}});
};


// Runs common test for form component
// - visible
// - required
// - validationState and validationMessage
// - help blocks

let checkElement = (element, props) => {

  // Check visible
  it('Returns nothing if not visible', () => {
    props.visible = false;
    checkNotVisible(shallow(React.createElement(element, props)));
    props.visible = true;
  });

  // Required
  it('Shows required marker if required', () => {
    props.required = true;
    checkIsRequired(shallow(React.createElement(element, props)));
    props.required = false;
    checkNotRequired(shallow(React.createElement(element, props)));
    props.required = false;
  });

  // Validation
  it('Shows validation state and message', () => {
    // state
    props.validationState = 'error';
    checkHasValidationError(mount(React.createElement(element, props)));
    props.validationState = 'warning';
    checkHasValidationWarning(mount(React.createElement(element, props)));
    props.validationState = 'success';
    checkHasValidationSuccess(mount(React.createElement(element, props)));
    props.validationState = null;
    checkHasNoValidationClass(mount(React.createElement(element, props)));
    // message in label
    props.validationMessage = "Validate!";
    checkValidationMessageContains(mount(React.createElement(element, props)), props.validationMessage);
    props.validationMessage = null;
  });

  // Help blocks
  it('Shows help block and inline help block', () => {
    // help block
    props.helpBlock = 'Help me...';
    checkHelpBlock(mount(React.createElement(element, props)), props.helpBlock);
    props.helpBlock = null;
    // inline help block
    props.inlineHelpBlock = 'Help me...inline';
    checkInlineHelpBlock(mount(React.createElement(element, props)), props.inlineHelpBlock);
    props.inlineHelpBlock = null;
  });

};

// CheckBoxGroup

describe('CheckBoxGroup', () => {

  let handleChange = (e) => {

  };

  var props = {
    controlId: "aComponent",
    label: "A checkbox",
    handleChange: handleChange,
    items: [
      {value:"A", text:"A"},
      {value:"B", text:"B"},
      {value:"C", text:"C"},
      {value:"D", text:"D"}
    ],
    formGroupClass: "myClass",
    formGroupId: "myId"
  };

  var wrapper = mount(<CheckboxGroup {...props} />);

  it('Can render with required props', () => {

    // form group
    expect(wrapper.find('.myClass').is('#myId')).toBeTruthy();

    expect(wrapper.find(`#${props.controlId}`).length).toBe(1);

    // control label
    let controlLabel = wrapper.find('label.control-label');
    expect(controlLabel.text()).toEqual('A checkbox');
    expect(controlLabel.is('[htmlFor="aComponent"]')).toBeTruthy();

    // checkboxes
    let checkboxes = wrapper.find('.checkbox');
    expect(checkboxes.length).toEqual(4);


  });

  checkElement(CheckboxGroup, props);

});

// CheckBoxGroup2Column

describe('CheckBoxGroup2Column', () => {

  let handleChange = (e) => {

  };

  var props = {
    controlId: "aComponent",
    label: "A checkbox",
    handleChange: handleChange,
    items: [
      {value:"A", text:"A"},
      {value:"B", text:"B"},
      {value:"C", text:"C"},
      {value:"D", text:"D"}
    ],
    formGroupClass: "myClass",
    formGroupId: "myId"
  };

  it('Can render with required props', () => {

    var wrapper = mount(<CheckboxGroup2Column {...props} />);

    expect(wrapper.find(`#${props.controlId}`).length).toBe(1);

    // form group
    expect(wrapper.find(`.${props.formGroupClass}`).is(`#${props.formGroupId}`)).toBeTruthy();

    // control label
    let controlLabel = wrapper.find('label.control-label');
    expect(controlLabel.text()).toEqual('A checkbox');
    expect(controlLabel.is('[htmlFor="aComponent"]')).toBeTruthy();

    // checkboxes
    let checkboxes = wrapper.find('.checkbox');
    expect(checkboxes.length).toEqual(4);


  });

  checkElement(CheckboxGroup2Column, props);

});


// RadioGroup

describe('RadioGroup', () => {

  let handleChange = (e) => {

  };

  var props = {
    controlId: "aComponent",
    label: "A label",
    handleChange: handleChange,
    items: [
      {value:"A", text:"A"},
      {value:"B", text:"B"},
      {value:"C", text:"C"},
      {value:"D", text:"D"}
    ],
    formGroupClass: "myClass",
    formGroupId: "myId"
  };

  it('Can render with required props', () => {

    var wrapper = mount(<RadioGroup {...props} />);

    expect(wrapper.find(`#${props.controlId}`).length).toBe(1);

    // form group
    expect(wrapper.find(`.${props.formGroupClass}`).length).toBe(1);
    expect(wrapper.find(`.${props.formGroupClass}`).is(`#${props.formGroupId}`)).toBeTruthy();

    // control label
    let controlLabel = wrapper.find('label.control-label');
    expect(controlLabel.text()).toEqual(props.label);
    expect(controlLabel.is(`[htmlFor="${props.controlId}"]`)).toBeTruthy();

    // checkboxes
    let checkboxes = wrapper.find('.radio');
    expect(checkboxes.length).toEqual(4);


  });

  checkElement(RadioGroup, props);

});


// SelectBox

describe('SelectBox', () => {

  let handleChange = (e) => {

  };

  var props = {
    controlId: "aComponent",
    label: "A label",
    handleChange: handleChange,
    items: [
      {value:"A", text:"A"},
      {value:"B", text:"B"},
      {value:"C", text:"C"},
      {value:"D", text:"D"}
    ],
    formGroupClass: "myClass",
    formGroupId: "myId",
    visible:true
  };

  it('Can render with required props', () => {

    var wrapper = mount(<SelectBox {...props} />);

    expect(wrapper.find(`#${props.controlId}`).length).toBe(1);

    // form group
    expect(wrapper.find(`.${props.formGroupClass}`).length).toBe(1);
    expect(wrapper.find(`.${props.formGroupClass}`).is(`#${props.formGroupId}`)).toBeTruthy();

    // control label
    let controlLabel = wrapper.find('label.control-label');
    expect(controlLabel.text()).toEqual(props.label);
    expect(controlLabel.is(`[htmlFor="${props.controlId}"]`)).toBeTruthy();

    // options
    let options = wrapper.find('option');
    expect(options.length).toEqual(4);

    props.addNotAnswered = true;
    wrapper = mount(<SelectBox {...props} />);

    options = wrapper.find('option');
    expect(options.length).toEqual(5);

    expect(options.find('.notAnswered').length).toBe(1);


  });

  it('Can add notAnswered field', () => {
    props.addNotAnswered = true;
    let wrapper = mount(<SelectBox {...props} />);
    let options = wrapper.find('option');
    expect(options.length).toEqual(5);
    expect(options.find('.notAnswered').length).toBe(1);
    props.addNotAnswered = false;
  });

  checkElement(RadioGroup, props);

});


// ValidatedFormGroup

describe('ValidatedFormGroup', () => {

  let handleChange = (e) => {
    console.log(e.target.value);
  };

  var props = {
    controlId: "aComponent",
    label: "A label",
    handleChange: handleChange,
    value:"This is the value",
    formGroupClass: "myClass",
    formGroupId: "myId"
  };

  it('Can render with required props', () => {

    var wrapper = mount(<ValidatedFormGroup {...props} />);

    expect(wrapper.find(`#${props.controlId}`).length).toBe(1);

    // form group
    expect(wrapper.find(`.${props.formGroupClass}`).length).toBe(1);
    expect(wrapper.find(`.${props.formGroupClass}`).is(`#${props.formGroupId}`)).toBeTruthy();

    // control label
    let controlLabel = wrapper.find('label.control-label');
    expect(controlLabel.text()).toEqual(props.label);
    expect(controlLabel.is(`[htmlFor="${props.controlId}"]`)).toBeTruthy();

    expect(wrapper.find('input.form-control').html()).toEqual("<input type=\"text\" value=\"This is the value\" id=\"aComponent\" class=\"form-control\">");

  });

  checkElement(ValidatedFormGroup, props);

});

describe('TagInput', () => {

  let handleChange = (e) => {
    console.log(e.target.value);
  };

  var props = {
    controlId: "aComponent",
    label: "A label",
    handleChange: handleChange,
    formGroupClass: "myClass",
    formGroupId: "myId"
  };

  it('Can render with required props', () => {

    var wrapper = mount(<TagInput {...props} />);

    expect(wrapper.find(`#${props.controlId}`).length).toBe(1);

    // form group
    expect(wrapper.find(`.${props.formGroupClass}`).length).toBe(1);
    expect(wrapper.find(`.${props.formGroupClass}`).is(`#${props.formGroupId}`)).toBeTruthy();

    // control label
    let controlLabel = wrapper.find('label.control-label');
    expect(controlLabel.text()).toEqual(props.label);
    expect(controlLabel.is(`[htmlFor="${props.controlId}"]`)).toBeTruthy();

  });

  checkElement(TagInput, props);


});


// TODO: DateRangePickerWrapper