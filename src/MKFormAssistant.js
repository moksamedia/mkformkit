/**
 * Created by cantgetnosleep on 10/26/16.
 */

import _ from 'lodash';

let VALID_FORM_DESCRIPTION_KEYS = ["value", "required", "default", "validate", "inputTransformer", "postChangeHook"];

export default class MKFormAssistant {

  containsOnlyValidKeys(formItemValues) {
    return Object.keys(this.getInvalidKeys(formItemValues)).length != 0;
  }

  getInvalidKeys(formItemValues) {
    return _.omit(formItemValues, VALID_FORM_DESCRIPTION_KEYS);
  }

  checkFormDescriptionKeys(formItemValues) {

    if (this.containsOnlyValidKeys(formItemValues)) {

      let invalidKeys = this.getInvalidKeys(formItemValues);

      _.forIn(invalidKeys, (val, key) => {
        throw new Error("Unrecognized attribute: " + key + ", in form description: " + formItemName + ". Use otherState for non-standard state values.");
      });

    }
  }

  constructor(formDescription, otherState, handleSubmitCallback, component) {

    this.formDescription = formDescription;
    this.otherState = otherState;
    this.handleSubmitCallback = handleSubmitCallback.bind(component);
    this.component = component;

    this.setStateFn = component.setState.bind(component);

    this.formProps = {};
    this.callbacks = {};
    this.formState = {};
    this.defaultValues = {};

    _.forIn(this.formDescription, (formItemValues, formItemName) => {

      this.checkFormDescriptionKeys(formItemValues);

      // Form state

      this.formState[formItemName] = {};

      this.formState[formItemName].validationState = null;
      this.formState[formItemName].validationMessage = null;
      this.formState[formItemName].value = _.has(formItemValues, 'value') ? formItemValues.value : formItemValues.default;

      // Form props

      this.formProps[formItemName] = {};

      this.formProps[formItemName].required = _.has(formItemValues, 'required') ? formItemValues.required : false;
      this.formProps[formItemName].handleChange =  ::this.getHandleChange(formItemName);

      // Default values

      this.defaultValues[formItemName] = {};

      this.defaultValues[formItemName] = formItemValues.default !== undefined ? formItemValues.default : null;

      // Callbacks

      this.callbacks[formItemName] = {};

      this.callbacks[formItemName].validate = formItemValues.validate !== undefined ? formItemValues.validate : null;
      this.callbacks[formItemName].inputTransformer = formItemValues.inputTransformer !== undefined ? formItemValues.inputTransformer : null;
      this.callbacks[formItemName].postChangeHook = formItemValues.postChangeHook !== undefined ? formItemValues.postChangeHook : null;

    });

    // Merge other state with form state and check for clash
    _.forIn(this.otherState, (obj, key) => {
      if (_.has(this.formState, key)) {
        throw new Error("Other state should not contain a key that overwrites form state. Key = " + key);
      }
      this.formState[key] = obj;
    });

    this.formProps.handleSubmit = ::this.handleSubmitInternal;

  }

  // Handle submit iterates through form state and extracts the
  // values as results
  handleSubmitInternal(e) {

    e.preventDefault();

    // CHECK VALIDATION
    _.forIn(this.formState, (value, key) => {
      //console.log(key +": " + JSON.stringify(value));
    });

    // PACKAGE RESULTS
    let results = {};

    _.forIn(this.formState, (formItemAttributes, formItemName) => {

      if (_.has(formItemAttributes, 'value')) {
        results[formItemName] = formItemAttributes.value;
      }

    });

    this.handleSubmitCallback(results);

  };

  // HANDLE CHANGE

  getHandleChange(path) {
    let _path = path;
    return (e) => {
      this.handleChange(_path, e);
    }
  }

  handleChange(path, e) {

    let value;
    let inputTransformer = this.callbacks[path].inputTransformer;
    let postChangeHook = this.callbacks[path].postChangeHook;

    // handle case where event object has been sent
    if (_.has(e, 'target.value')) {
      value = inputTransformer ? inputTransformer(e.target.value) : e.target.value;
    }
    // otherwise assume "e" is the actual value
    else {
      value = inputTransformer ? inputTransformer(e) : e
    }

    // call validate
    this.validateChange(path, value);

    // create the new state
    var newState = _.extend({}, this.component.state);

    _.set(newState, `${path}.value`, value);

    // get the post change hook chance
    if (postChangeHook) {

      /*
          Is there's 1 arguments, it's the new value for the path.
          If there's 2 arguments, it's a specific path and value.
          This allows the convenience of the most likely scenario:
          setting the value directly, but also allowing the ability
          to set arbitrary state params.
       */
      let set = ((_value, _path) => {
        if (typeof _path === "undefined") {
          _.set(newState, path+'.value', _value);
        }
        else {
          _.set(newState, _path, _value);
        }
      }).bind(this);

      postChangeHook(value, set, newState);

    }

    // set the new state
    this.setStateFn(newState);

  }

  // VALIDATION

  validateChange(path, value) {
    let validationResult = this.validate(path, value);
    this.setValidationStateAndMessageForPath(path, validationResult.state, validationResult.message);
  }

  validate(path, value) {

    if (value && typeof this.callbacks[path].validate === 'function') {
      return this.callbacks[path].validate(value);
    }
    else {
      return {state: null, message: null};
    }

  }

  setValidationStateAndMessageForPath(path, state, message) {
    var newState = _.extend({}, this.component.state);
    _.set(newState, path+'.validationState', state);
    _.set(newState, path+'.validationMessage', message);
    this.setStateFn(newState);
  }

}