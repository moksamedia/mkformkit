/**
 * Created by cantgetnosleep on 10/13/16.
 */

import React, { Component } from 'react';
import _ from 'lodash';

let formStateKeys = ["value", "required"];
let formPropKeys = ["default", "validate", "inputTransformer", "postChangeHook"];
let validFormDescriptionKeys = formStateKeys + formPropKeys;

/**
 *
 * Takes the formDescription and normalizes the initial state, setting the values to the
 * default values, and setting any unset default values to null.
 *
 * Also wraps the handleSubmit call to strip out the metadata and call the handleSubmit
 * prop callback with only the actual values to submit.
 *
 * @param props
 * @returns {{}}
 * @constructor
 */
export class FormManager extends Component {

  render() {

    let props = this.props;

    let {formDescription, formValues, otherState} = props;

    // Build the initial form state from the formDescription
    let formState = _.mapValues(formDescription, (obj, key) => {

      return _.mapValues(obj, (attributeValue, attributeName) => {

        // handle form state keys
        if (attributeName == "value") {
          return formValues && formValues[key] ? formValues[key] : obj.default
        }
        else if (attributeName == "required") {
          return obj.required ? true : false
        }
        // throw error if key is not one of the prop keys
        else if (!formPropKeys.includes(attributeName)) {
          throw new Error("Unrecognized attribute: " + attributeName + ", in form description: " + key + ". Use otherState for non-standard state values.");
        }

      });

    });

    // Build form props (right now only default value)
    let formProps = _.mapValues(formDescription, (obj) => {
      return {
        default: obj.default !== undefined ? obj.default : null,
        validate: obj.validate !== undefined ? obj.validate : null,
        inputTransformer: obj.inputTransformer !== undefined ? obj.inputTransformer : null,
        postChangeHook: obj.postChangeHook !== undefined ? obj.postChangeHook : null
      };
    });

    // Handle submit iterates through form state and extracts the
    // values as results
    let handleSubmit = (e) => {

      e.preventDefault();
      
      let results = {};

      _.forIn(props.formState, (value, key) => {

        results[key] = value.value;

      });

      props.handleSubmit(results);

    };

    // Should be only one child!

    if (Array.isArray(props.children)) {
      throw new Error("FormManager should only have one child element!");
    }

    return React.cloneElement(props.children, {formState, formProps, otherState, handleSubmit});

  }

};

FormManager.propTypes = {
  formDescription: React.PropTypes.object.isRequired,
  formValues: React.PropTypes.object,
  otherState: React.PropTypes.object
};

/**
 * Handles validation logic. Injects the validationState and validationMessage into the
 * formValidation prop, and holds validation state.
 */
export class FormValidator extends Component {

  constructor(props) {

    super(props);

    let validatedFormState = _.mapValues(this.props.formState, (obj) => {
      return {
        validationState:null,
        validationMessage:null,
      };
    });

    this.validationFunctions = _.mapValues(this.props.formProps, (obj) => {
      return obj.validate;
    });

    this.state = {
      validation: validatedFormState
    }

  }

  validate(path, value) {

    let validationFunctions = this.validationFunctions;

    if (value && typeof validationFunctions[path] === 'function') {
      return validationFunctions[path](value);
    }
    else {
      return {state:null, message:null};
    }

  }

  setValidationStateAndMessageForPath(path, state, message) {
    var newState = _.extend({}, this.state.validation);
    _.set(newState, path + '.validationState', state);
    _.set(newState, path + '.validationMessage', message);
    this.setState({validation: newState});
  }

  validateChange(path, value) {
    let validationResult = this.validate(path, value);
    this.setValidationStateAndMessageForPath(path, validationResult.state, validationResult.message);
  }


  getValidateChange(path) {
    let _path = path;
    return (e) => {
      this.handleChange(_path, e);
    }
  }

  handleSubmit(e) {

    e.preventDefault;

    _.forIn(this.props.formState, (value, key) => {
      //console.log(key +": " + JSON.stringify(value));
    })


  }

  render() {

    //console.log("Render FormValidator");

    let childProps = {
      validateChange: ::this.validateChange,
      formState: this.props.formState,
      otherState: this.props.otherState,
      formProps: this.props.formProps,
      formValidation: this.state.validation,
      handleSubmit: this.props.handleSubmit
    };

    // Should be only one child!

    if (Array.isArray(this.props.children)) {
      throw new Error("FormValidator should only have one child element!");
    }

    return React.cloneElement(this.props.children, childProps);

  }

}

/**
 * Manages the actual form state. Maps all of the validation information, meta info such
 * as "required", and state values into the format expected by the form elements.
 */
export class FormStateHandler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formState: this.props.formState,
      otherState: this.props.otherState
    };
  }

  handleChange(path, e) {

    let value;
    let inputTransformer = this.props.formProps[path].inputTransformer;
    let postChangeHook = this.props.formProps[path].postChangeHook;

    // handle case where event object has been sent
    if (_.has(e, 'target.value')) {
      value = inputTransformer ? inputTransformer(e) : e.target.value;
    }
    // otherwise assume "e" is the actual value
    else {
      value = inputTransformer ? inputTransformer(e) : e
    }

    // call validate
    if (this.props.validateChange) {
      this.props.validateChange(path, value);
    }

    // create the new state
    var newState = _.extend({}, this.state);
    _.set(newState, `formState.${path}.value`, value);

    // get the post change hook chance
    if (postChangeHook) {

      let set = ((path, value) => {
        if (_.has(this.state.formState, path)) {
          _.set(newState, `formState.${path}`, value);
        }
        else {
          _.set(newState, `otherState.${path}`, value);
        }
      }).bind(this);

      postChangeHook(value, set, newState);
    }

    // set the new state
    this.setState(newState);
    
  }

  getHandleChange(path) {
    let _path = path;
    return (e) => {
      this.handleChange(_path, e);
    }
  }

  render() {

    let childProps = {};

    _.forIn(this.state.formState, (value, key) => {

      childProps[key] = {
        ...value, // value and required
        handleChange: ::this.getHandleChange(key),
        ...this.props.formValidation[key] // validationState and validationMethod
      }


    });

    _.merge(this.props.formState, this.props.otherState);

    childProps.handleSubmit = this.props.handleSubmit;

    //console.log(childProps);

    return React.cloneElement(this.props.children, {...childProps});

  }
}

export class MKForm extends Component {

  render() {
    return (
      <FormManager formDescription={this.props.formDescription} otherState={this.props.otherState} handleSubmit={this.props.handleSubmit}>
        <FormValidator>
          <FormStateHandler>
            {this.props.children}
          </FormStateHandler>
        </FormValidator>
      </FormManager>
    )
  };

};

MKForm.propTypes = {
  formDescription:React.PropTypes.object.isRequired,
  otherState:React.PropTypes.object,
  handleSubmit:React.PropTypes.func.isRequired,
};

MKForm.defaultProps = {
  otherState: {}
};

export default MKForm;
