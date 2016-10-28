"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// valid form item attributes in formDescription
var VALID_FORM_DESCRIPTION_KEYS = ["value", "required", "default", "visible", "validate", "inputTransformer", "postChangeHook"]; /**
                                                                                                                                  * Created by cantgetnosleep on 10/26/16.
                                                                                                                                  */

var MKFormAssistant = function () {

  // does formItemValues contain only valid keys?
  MKFormAssistant.prototype.containsOnlyValidKeys = function containsOnlyValidKeys(formItemValues) {
    return (0, _keys2.default)(this.getInvalidKeys(formItemValues)).length != 0;
  };

  // return invalid keys from formItemValues


  MKFormAssistant.prototype.getInvalidKeys = function getInvalidKeys(formItemValues) {
    return _lodash2.default.omit(formItemValues, VALID_FORM_DESCRIPTION_KEYS);
  };

  // checks item from form description for valid keys and throws an error for each invalid key


  MKFormAssistant.prototype.checkFormDescriptionKeys = function checkFormDescriptionKeys(formItemValues) {

    if (this.containsOnlyValidKeys(formItemValues)) {

      var invalidKeys = this.getInvalidKeys(formItemValues);

      _lodash2.default.forIn(invalidKeys, function (val, key) {
        throw new Error("Unrecognized attribute: " + key + ", in form description: " + formItemName + ". Use otherState for non-standard state values.");
      });
    }
  };

  /*
    formDescription: object that describes the form items
    otherState: other state key/value pairs that are merged with processed formDescription before being set to component state
    handleSubmitCallback: the callback that the form assistant calls with the form values
    component: the React form component
   */


  function MKFormAssistant(formDescription, otherState, handleSubmitCallback, component) {
    var _this = this;

    (0, _classCallCheck3.default)(this, MKFormAssistant);


    this.formDescription = formDescription;
    this.otherState = otherState;
    this.handleSubmitCallback = handleSubmitCallback.bind(component);
    this.component = component;

    // the the setState function and bind to the component
    this.setStateFn = component.setState.bind(component);

    this.formProps = {};
    this.callbacks = {};
    this.formState = {};
    this.defaultValues = {};

    // iterate over formDescription building/collecting the necessary state, props, default values, and callbacks
    // necessary for managing the form

    _lodash2.default.forIn(this.formDescription, function (formItemValues, formItemName) {

      // make sure the form item has only valid keys
      _this.checkFormDescriptionKeys(formItemValues);

      ///////////////////////////////////////
      // Form state

      _this.formState[formItemName] = {};

      _this.formState[formItemName].validationState = null;
      _this.formState[formItemName].validationMessage = null;
      _this.formState[formItemName].value = _lodash2.default.has(formItemValues, 'value') ? formItemValues.value : formItemValues.default;
      _this.formState[formItemName].visible = _lodash2.default.has(formItemValues, 'visible') ? formItemValues.visible : true;

      ///////////////////////////////////////
      // Form props

      _this.formProps[formItemName] = {};

      _this.formProps[formItemName].required = _lodash2.default.has(formItemValues, 'required') ? formItemValues.required : false;
      _this.formProps[formItemName].handleChange = _this.getHandleChange.call(_this, formItemName);

      ///////////////////////////////////////
      // Default values

      _this.defaultValues[formItemName] = {};

      _this.defaultValues[formItemName] = formItemValues.default !== undefined ? formItemValues.default : null;

      ///////////////////////////////////////
      // Callbacks

      _this.callbacks[formItemName] = {};

      _this.callbacks[formItemName].validate = formItemValues.validate !== undefined ? formItemValues.validate : null;
      _this.callbacks[formItemName].inputTransformer = formItemValues.inputTransformer !== undefined ? formItemValues.inputTransformer : null;
      _this.callbacks[formItemName].postChangeHook = formItemValues.postChangeHook !== undefined ? formItemValues.postChangeHook : null;
    });

    // Merge other state with form state and check for clash
    _lodash2.default.forIn(this.otherState, function (obj, key) {
      if (_lodash2.default.has(_this.formState, key)) {
        throw new Error("Other state should not contain a key that overwrites form state. Key = " + key);
      }
      _this.formState[key] = obj;
    });

    this.formProps.handleSubmit = this.handleSubmitInternal.bind(this);
  }

  ///////////////////////////////////////
  // HANDLE SUBMIT

  // Handle submit iterates through form state and extracts the
  // values as results


  MKFormAssistant.prototype.handleSubmitInternal = function handleSubmitInternal(e) {

    e.preventDefault();

    // CHECK VALIDATION
    _lodash2.default.forIn(this.formState, function (value, key) {
      // TODO: need to finish validation and check required state
      //console.log(key +": " + JSON.stringify(value));
    });

    // PACKAGE RESULTS
    var results = this.getValuesFromFormState();

    this.handleSubmitCallback(results);
  };

  // if form item has a value attribute, extracts it
  MKFormAssistant.prototype.getValuesFromFormState = function getValuesFromFormState() {

    var results = {};

    _lodash2.default.forIn(this.formState, function (formItemAttributes, formItemName) {

      if (_lodash2.default.has(formItemAttributes, 'value')) {
        results[formItemName] = formItemAttributes.value;
      }
    });

    return results;
  };

  ///////////////////////////////////////
  // HANDLE CHANGE

  // returns a handleChange method curried with the form item key path already
  // specified. this is what is sent to the form components as their handleChange prop


  MKFormAssistant.prototype.getHandleChange = function getHandleChange(path) {
    var _this2 = this;

    var _path = path;
    return function (e) {
      _this2.handleChange(_path, e);
    };
  };

  // given a path, and e, which can either be a value or an event, runs:
  // - inputTransformer
  // - validation
  // - extends state and sets new value for path
  // - postChangeHook
  // - sets state using bound setStateFn


  MKFormAssistant.prototype.handleChange = function handleChange(path, e) {

    var value = void 0;
    var inputTransformer = this.callbacks[path].inputTransformer;
    var postChangeHook = this.callbacks[path].postChangeHook;

    // handle case where event object has been sent
    if (_lodash2.default.has(e, 'target.value')) {
      value = inputTransformer ? inputTransformer(e.target.value) : e.target.value;
    }
    // otherwise assume "e" is the actual value
    else {
        value = inputTransformer ? inputTransformer(e) : e;
      }

    // call validate
    this.validateChange(path, value);

    // create the new state
    var newState = _lodash2.default.extend({}, this.component.state);

    _lodash2.default.set(newState, path + ".value", value);

    // get the post change hook chance
    if (postChangeHook) {

      /*
          Is there's 1 arguments, it's the new value for the path.
          If there's 2 arguments, it's a specific path and value.
          This allows the convenience of the most likely scenario:
          setting the value directly, but also allowing the ability
          to set arbitrary state params.
       */
      var set = function (_value, _path) {
        if (typeof _path === "undefined") {
          _lodash2.default.set(newState, path + '.value', _value);
        } else {
          _lodash2.default.set(newState, _path, _value);
        }
      }.bind(this);

      postChangeHook(value, set, newState);
    }

    // set the new state
    this.setStateFn(newState);
  };

  ///////////////////////////////////////
  // VALIDATION

  // validates a value for path, and sets validation state and message


  MKFormAssistant.prototype.validateChange = function validateChange(path, value) {
    var validationResult = this.validate(path, value);
    this.setValidationStateAndMessageForPath(path, validationResult.state, validationResult.message);
  };

  // if the path has a validate fn, use it, otherwise return
  // null & null for validation state and message


  MKFormAssistant.prototype.validate = function validate(path, value) {

    if (value && typeof this.callbacks[path].validate === 'function') {
      return this.callbacks[path].validate(value);
    } else {
      return { state: null, message: null };
    }
  };

  // set the state and message


  MKFormAssistant.prototype.setValidationStateAndMessageForPath = function setValidationStateAndMessageForPath(path, state, message) {
    var newState = _lodash2.default.extend({}, this.component.state);
    _lodash2.default.set(newState, path + '.validationState', state);
    _lodash2.default.set(newState, path + '.validationMessage', message);
    this.setStateFn(newState);
  };

  return MKFormAssistant;
}();

exports.default = MKFormAssistant;