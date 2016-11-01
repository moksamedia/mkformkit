/**
 * Created by cantgetnosleep on 10/26/16.
 */

import _ from 'lodash';

// valid form item attributes in formDescription
let VALID_FORM_DESCRIPTION_KEYS = ["value", "required", "default", "visible", "validate", "inputTransformer", "postChangeHook"];

export default class MKFormAssistant {

  // does formItemValues contain only valid keys?
  containsOnlyValidKeys(formItemValues) {
    return Object.keys(this.getInvalidKeys(formItemValues)).length != 0;
  }

  // return invalid keys from formItemValues
  getInvalidKeys(formItemValues) {
    return _.omit(formItemValues, VALID_FORM_DESCRIPTION_KEYS);
  }

  // checks item from form description for valid keys and throws an error for each invalid key
  checkFormDescriptionKeys(formItemValues, formItemName) {

    if (this.containsOnlyValidKeys(formItemValues)) {

      let invalidKeys = this.getInvalidKeys(formItemValues);

      _.forIn(invalidKeys, (val, key) => {
        throw new Error("Unrecognized attribute: " + key + ", in form description: " + formItemName + ". Use otherState for non-standard state values.");
      });

    }
  }

  /*
    formDescription: object that describes the form items
    otherState: other state key/value pairs that are merged with processed formDescription before being set to component state
    handleSubmitCallback: the callback that the form assistant calls with the form values
    component: the React form component
   */
  constructor(formDescription, component, options) {

    this.component = component;
    this.formDescription = formDescription;

    if (_.has(options, 'handleSubmit')) {
      this.handleSubmitCallback = options.handleSubmit.bind(component);
    }
    else {
      this.handleSubmitCallback = component.handleSubmit.bind(component);
    }

    let otherState = {};

    if (_.has(options, 'otherState')) {
      otherState = options.otherState;
    }

    // the the setState function and bind to the component
    this.setStateFn = component.setState.bind(component);

    this.formProps = {};
    this.callbacks = {};
    let formState = {}; // we don't maintain the state here once it's built
    this.defaultValues = {};

    // iterate over formDescription building/collecting the necessary state, props, default values, and callbacks
    // necessary for managing the form

    _.forIn(formDescription, (formItemValues, formItemName) => {



      let processFormItem = (values, name, group) => {

        // make sure the form item has only valid keys
        this.checkFormDescriptionKeys(values, name);

        ///////////////////////////////////////
        // Form state

        let isGroup = typeof group === 'string';

        let path = isGroup == true ? group+'.'+name : name;

        _.set(formState, path, {});

        _.set(formState, path+'.validationState', null);
        _.set(formState, path+'.validationMessage', null);
        // if value is defined, set item.value to that, otherwise use default if it's defined, otherwise use ''
        _.set(formState, path+'.value', _.has(values, 'value') ? values.value : typeof values.default !== 'undefined' ? values.default : '');
        _.set(formState, path+'.visible', _.has(values, 'visible') ? values.visible : true);

        ///////////////////////////////////////
        // Form props

        _.set(this.formProps, path, {});

        _.set(this.formProps, path+'.required', _.has(values, 'required') ? values.required : false);
        _.set(this.formProps, path+'.handleChange', ::this.getHandleChange(path));
        _.set(this.formProps, path+'.getMergedStateAndProps', () => {
            return _.merge({}, _.get(this.formProps, path), _.get(component.state, path));
          });

        ///////////////////////////////////////
        // Default values

        _.set(this.defaultValues, path, {});

        _.set(this.defaultValues, path, values.default !== undefined ? values.default : null);

        ///////////////////////////////////////
        // Callbacks

        _.set(this.callbacks, path, {});

        _.set(this.callbacks, path+'.validate', values.validate !== undefined ? values.validate : null);
        _.set(this.callbacks, path+'.inputTransformer', values.inputTransformer !== undefined ? values.inputTransformer : null);
        _.set(this.callbacks, path+'.postChangeHook', values.postChangeHook !== undefined ? values.postChangeHook : null);

      };

      if (_.has(formItemValues, 'isGroup') && formItemValues.isGroup) {

        _.forIn(formItemValues, (subGroupValues, subGroupName) => {

          if (subGroupName != 'isGroup') {
            processFormItem(subGroupValues, subGroupName, formItemName);
          }

          _.set(this.formProps, formItemName+'.getMergedStateAndProps', () => {
            return _.merge({}, _.get(this.formProps, formItemName), _.get(component.state, formItemName));
          });

        });

        _.set(this.formProps, formItemName+'.isGroup', formItemValues.isGroup);

      }
      else {
        processFormItem(formItemValues, formItemName);
      }


    });

    // Merge other state with form state and check for clash
    _.forIn(otherState, (obj, key) => {
      if (_.has(formState, key)) {
        throw new Error("Other state should not contain a key that overwrites form state. Key = " + key);
      }
      formState[key] = obj;
    });

    this.formProps.handleSubmit = ::this.handleSubmitInternal;

    component.state = formState;
    component.formProps = this.formProps;

    this._initialFormState = formState;
  }

  ///////////////////////////////////////
  // HANDLE SUBMIT

  formItemIsValid(formItemState) {
    return formItemState.validationState == null || formItemState.validationState == 'success';
  }

  formItemFulfillsRequired(formItemState, formItemName) {
    return this.formItemIsValid(formItemState) && formItemState.value != null && formItemState.value != '' && formItemState.value != this.defaultValues[formItemName];
  }

  // Handle submit iterates through form state and extracts the
  // values as results
  handleSubmitInternal(e) {

    e.preventDefault();

    /*
        Make sure all form items with values pass validation
        Make sure all required items have valid values
        If valid, extract data and call submit callback with data
        It NOT valid, show alert and show item validationMessages
     */

    let invalidFormItemNames = [];

    // CHECK VALIDATION
    _.forIn(this.formDescription, (value, key) => {
      // TODO: need to finish validation and check required state
      //console.log(key +": " + JSON.stringify(value));

      let currentState = this.component.state;

      if (!this.formItemIsValid(currentState[key])) {
        invalidFormItemNames.push(key);
      }

      if (this.formProps[key].required && !this.formItemFulfillsRequired(currentState[key],key)) {
        invalidFormItemNames.push(key);
        this.setValidationStateAndMessageForPath(key, 'error', 'This is required');
      }

    });

    // PACKAGE RESULTS
    let results = this.getValuesFromFormState();

    this.handleSubmitCallback({ success: invalidFormItemNames.length == 0, invalidFormItemNames: invalidFormItemNames}, results);

  };

  // if form item has a value attribute, extracts it
  getValuesFromFormState() {

    let results = {};

    _.forIn(this.component.state, (formItemAttributes, formItemName) => {

      if (_.has(formItemAttributes, 'value')) {
        results[formItemName] = formItemAttributes.value;
      }

    });

    return results;
  }

  ///////////////////////////////////////
  // HANDLE CHANGE

  // returns a handleChange method curried with the form item key path already
  // specified. this is what is sent to the form components as their handleChange prop
  getHandleChange(path) {
    let _path = path;
    return (e) => {
      this.handleChange(_path, e);
    }
  }

  // given a path, and e, which can either be a value or an event, runs:
  // - inputTransformer
  // - validation
  // - extends state and sets new value for path
  // - postChangeHook
  // - sets state using bound setStateFn
  handleChange(path, e) {

    let value;
    let callbacks = _.get(this.callbacks, path);
    let inputTransformer = callbacks.inputTransformer;
    let postChangeHook = callbacks.postChangeHook;

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

  ///////////////////////////////////////
  // VALIDATION

  // validates a value for path, and sets validation state and message
  validateChange(path, value) {
    let validationResult = this.validate(path, value);
    this.setValidationStateAndMessageForPath(path, validationResult.state, validationResult.message);
  }

  // if the path has a validate fn, use it, otherwise return
  // null & null for validation state and message
  validate(path, value) {

    let validateFn = _.get(this.callbacks, path).validate;

    if (value && typeof validateFn === 'function') {
      return validateFn(value);
    }
    else {
      return {state: null, message: null};
    }

  }

  // set the state and message
  setValidationStateAndMessageForPath(path, state, message) {
    var newState = _.extend({}, this.component.state);
    _.set(newState, path+'.validationState', state);
    _.set(newState, path+'.validationMessage', message);
    this.setStateFn(newState);
  }

}