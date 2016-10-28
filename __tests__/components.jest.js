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
  SelectBox
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

  // Check visible
  it('Returns nothing if not visible', () => {
    props.visible = false;
    checkNotVisible(shallow(<CheckboxGroup {...props} />));
    props.visible = true;
  });

   // Required
  it('Shows required marker if required', () => {
    props.required = true;
    checkIsRequired(shallow(<CheckboxGroup {...props} />));
    props.required = false;
    checkNotRequired(shallow(<CheckboxGroup {...props} />));
    props.required = false;
  });

  // Validation
  it('Shows validation state and message', () => {
    // state
    props.validationState = 'error';
    checkHasValidationError(mount(<CheckboxGroup {...props} />));
    props.validationState = 'warning';
    checkHasValidationWarning(mount(<CheckboxGroup {...props} />));
    props.validationState = 'success';
    checkHasValidationSuccess(mount(<CheckboxGroup {...props} />));
    props.validationState = null;
    checkHasNoValidationClass(mount(<CheckboxGroup {...props} />));
    // message in label
    props.validationMessage = "Validate!";
    checkValidationMessageContains(mount(<CheckboxGroup {...props} />), props.validationMessage);
    props.validationMessage = null;
  });

  // Help blocks
  it('Shows help block and inline help block', () => {
    // help block
    props.helpBlock = 'Help me...';
    checkHelpBlock(mount(<CheckboxGroup {...props} />), props.helpBlock);
    props.helpBlock = null;
    // inline help block
    props.inlineHelpBlock = 'Help me...inline';
    checkInlineHelpBlock(mount(<CheckboxGroup {...props} />), props.inlineHelpBlock);
    props.inlineHelpBlock = null;
  });


});


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

  // Check visible
  it('Returns nothing if not visible', () => {
    props.visible = false;
    checkNotVisible(shallow(<CheckboxGroup2Column {...props} />));
    props.visible = true;
  });

  // Required
  it('Shows required marker if required', () => {
    props.required = true;
    checkIsRequired(shallow(<CheckboxGroup2Column {...props} />));
    props.required = false;
    checkNotRequired(shallow(<CheckboxGroup2Column {...props} />));
    props.required = false;
  });

  // Validation
  it('Shows validation state and message', () => {
    // state
    props.validationState = 'error';
    checkHasValidationError(mount(<CheckboxGroup2Column {...props} />));
    props.validationState = 'warning';
    checkHasValidationWarning(mount(<CheckboxGroup2Column {...props} />));
    props.validationState = 'success';
    checkHasValidationSuccess(mount(<CheckboxGroup2Column {...props} />));
    props.validationState = null;
    checkHasNoValidationClass(mount(<CheckboxGroup2Column {...props} />));
    // message in label
    props.validationMessage = "Validate!";
    checkValidationMessageContains(mount(<CheckboxGroup2Column {...props} />), props.validationMessage);
    props.validationMessage = null;
  });

  // Help blocks
  it('Shows help block and inline help block', () => {
    // help block
    props.helpBlock = 'Help me...';
    checkHelpBlock(mount(<CheckboxGroup2Column {...props} />), props.helpBlock);
    props.helpBlock = null;
    // inline help block
    props.inlineHelpBlock = 'Help me...inline';
    checkInlineHelpBlock(mount(<CheckboxGroup2Column {...props} />), props.inlineHelpBlock);
    props.inlineHelpBlock = null;
  });

});



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

  // Check visible
  it('Returns nothing if not visible', () => {
    props.visible = false;
    checkNotVisible(shallow(<RadioGroup {...props} />));
    props.visible = true;
  });

  // Required
  it('Shows required marker if required', () => {
    props.required = true;
    checkIsRequired(shallow(<RadioGroup {...props} />));
    props.required = false;
    checkNotRequired(shallow(<RadioGroup {...props} />));
    props.required = false;
  });

  // Validation
  it('Shows validation state and message', () => {
    // state
    props.validationState = 'error';
    checkHasValidationError(mount(<RadioGroup {...props} />));
    props.validationState = 'warning';
    checkHasValidationWarning(mount(<RadioGroup {...props} />));
    props.validationState = 'success';
    checkHasValidationSuccess(mount(<RadioGroup {...props} />));
    props.validationState = null;
    checkHasNoValidationClass(mount(<RadioGroup {...props} />));
    // message in label
    props.validationMessage = "Validate!";
    checkValidationMessageContains(mount(<RadioGroup {...props} />), props.validationMessage);
    props.validationMessage = null;
  });

  // Help blocks
  it('Shows help block and inline help block', () => {
    // help block
    props.helpBlock = 'Help me...';
    checkHelpBlock(mount(<RadioGroup {...props} />), props.helpBlock);
    props.helpBlock = null;
    // inline help block
    props.inlineHelpBlock = 'Help me...inline';
    checkInlineHelpBlock(mount(<RadioGroup {...props} />), props.inlineHelpBlock);
    props.inlineHelpBlock = null;
  });

});



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
    formGroupId: "myId"
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

  // Check visible
  it('Returns nothing if not visible', () => {
    props.visible = false;
    checkNotVisible(shallow(<SelectBox {...props} />));
    props.visible = true;
  });

  // Required
  it('Shows required marker if required', () => {
    props.required = true;
    checkIsRequired(shallow(<SelectBox {...props} />));
    props.required = false;
    checkNotRequired(shallow(<SelectBox {...props} />));
    props.required = false;
  });

  // Validation
  it('Shows validation state and message', () => {
    // state
    props.validationState = 'error';
    checkHasValidationError(mount(<SelectBox {...props} />));
    props.validationState = 'warning';
    checkHasValidationWarning(mount(<SelectBox {...props} />));
    props.validationState = 'success';
    checkHasValidationSuccess(mount(<SelectBox {...props} />));
    props.validationState = null;
    checkHasNoValidationClass(mount(<SelectBox {...props} />));
    // message in label
    props.validationMessage = "Validate!";
    checkValidationMessageContains(mount(<SelectBox {...props} />), props.validationMessage);
    props.validationMessage = null;
  });

  // Help blocks
  it('Shows help block and inline help block', () => {
    // help block
    props.helpBlock = 'Help me...';
    checkHelpBlock(mount(<SelectBox {...props} />), props.helpBlock);
    props.helpBlock = null;
    // inline help block
    props.inlineHelpBlock = 'Help me...inline';
    checkInlineHelpBlock(mount(<SelectBox {...props} />), props.inlineHelpBlock);
    props.inlineHelpBlock = null;
  });

});