# MoksaMedia Form Assistant for React Bootstrap

A wrapper library for React Bootstrap form components.

This library is a combination of a ES6 form helper class that takes a form description object as an input and simplifies common form tasks such as state management, validation, pre- and post-change hooks, and value extraction for data submission.

It is written to work with React Bootstrap, but might be useful with other form systems.

### Features:
- required values
- default form values
- validate callback to handle form validation
- inputTransformer to handle raw change events or transform input values
- postChangeHook to process value changes after validation logic and allow the setting of other state values in response to value changes (such as showing and hiding other elements)
- descriptive form syntax removed from JSX that greatly cleans up from JSX
- creation of other arbitrary form element state values
- date range picker using react-dates
- tag input using react-tag-input
- compatible with Rubix react theme or React Bootstrap

The library consists of the MKFormAssistant class that wraps all of the form logic, handling props and state and the various callbacks for changes, validation, and submission, and a a collection of React Bootstrap form element wrapper classes.

### Motivation

Building a web application with a lot of forms using React Bootstrap I noticed that I was creating a lot of repeated boilerplate code that could be unified and simplified. Each element had a lot of common functionality, such as validation, change handling, visibility, etc...

This library is how I simplified and unified the form creation process using React Bootstrap. It consists of a form assistant class that wraps up a lot of common functions and logic, and some wrapper classes around the React Bootstrap form elements. To create a form you write a formDescription that tells the form assistant (MKFormAssistant) about the form you are creating, and you pass this to the MKFormAssistant in the constructor of the React element for your form. You then use the bundled form element items in your form and pass them the generated initial state and the formProps.

~~~~

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
      // validation passed, handle data
    }
    else {
      // validation failed
    }

  };

  render() {

    return (

      <Form id='create-form'>

        {/* NAME */}
        <ValidatedFormGroup
          label="Name"
          placeHolder="Choose a public name for your event"
          {...this.formProps.name}
          {...this.state.name}
        />

        <FormGroup controlId="formSubmit">
          <Button className="submit" type="submit" onClick={this.formProps.handleSubmit}>
            Submit
          </Button>
        </FormGroup>

      </Form>

    )

  }

};

~~~~

### Form Elements

CheckboxGroup
- a group of CheckboxItems

CheckboxGroup2Column
- like CheckboxGroup, but splits the checkboxes into two columns for better layout

RadioGroup
- a list of RadioItems that can allow multiple select

SelectBox
- dropdown select box with a list of options

DateRangePickerWrapper
- uses react-dates to wrap a control for selecting a range of dates

TagInput
- wraps react-tag-input to provide a nice interface for inputting tags

ValidatedFormGroup
- wraps react-bootstrap's FormGroup and FormControl to provide a text field and text area
- supports pre- & post-addons

### Form description schema

The form description is a javascript object with key / object pairs that contain the attributes that describe each form element or item. The form item name must be unique and cannot clash with any other state or prop entries. Form state and props will be created using this name.

~~~~

formDescription: {

  ...

  <form item name> : {
      value:
        - an initial value for the item
        - string or array (for items that allow multiple values)
      required:
        - is a validated and non-null and non-empty value required to submit the form
        - boolean
      default:
        - what is the default value for the item (used as the initial state if value isn't specified)
        - string or array
      visible:
        - is the item visible (can be used to show and hide the item dynamically)
        - boolean
      validate:
        - called by handleChange to return new validation state
        - function, returns { state:<new state>, message:<new message> }
        - state is one of 'success', 'error', or null
        - message is any string
      inputTransformer
        - called by handleChange before validation, passed the new value
        - function, returns a transformed value to be validated
      postChangeHook:
        - called by handleChange after validation, passed the new value, a function used to set a path on the state, and the new state
        - function, returns nothing but can be used to set arbitrary values in the state based on user input
  }

  ...

}

~~~~

## Notes on callback functions

**validate**: called by handleChange when onChange fires. May be null or not specified, in which case the form item is unvalidated and any value is accepted. Is passed the new value, and must return an object with state = ('error' | 'success' | null) and message = "Any arbitrary string". If state is null, this will clear any validation decoration.

**inputTransformer**: passed the new value, pre-validation, and can return a transformed value

**postChangeHook**: passed the new value, post-validation, as well as a set() function that can be used to update the state and the new state itself.

`postChangeHook(newValue, set, newState)`

set() is a closure that can be used to make arbitrary updates to the form element state. It can be called with a value and path, in which case the path in the state is set to the value, or just a value, in which case the path is assumed to be the current form item's value.

`set(value, path)` -> set any arbitrary path in the state to value
`set(value)` -> set value of current form item to value

### handleChange

You do not need to specify a change handler for form elements. This is created automatically and injected into the formProps for each form item, which is passed to the item using the spread operator, typically: `{...this.formProps.<item name>}`

### state and formProps

When you create the MKFormAssistant object in the form element constructor, the initial state and the formProps are set on the form element object for you automatically.

~~~~

constructor(props) {
  super(props);
  this.formAssistant = new MKFormAssistant(formDescription, otherState, this.handleSubmit, this);
  // state and formProps are generated and injected into form element and can
  // be used in render method
}

~~~~

formProps for each form item contains two fields:
- required
- handleChange

the form state for each item contains:
- value
- visible
- validationState
- validationMessage


### Example Form description

~~~~

// formDescription is passed to the MKFormAssistant object to setup
// things like default values, initial values, pre- & post-change hooks
// and if a form item is required

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
      return {state:'error', message:'Doh!'};
    },
    required: false,
    default: '',
    inputTransformer: (value) => {
      return value.toUpperCase();
    }
  },
  location: {
    default: '',
    postChangeHook:(value, set) => {
      set(value.toLowerCase());
    }
  },
  message: {
    default: '',
    postChangeHook:(value, set) => {
      set("I'm setting the location value", 'location.value');
    }
  },
  other: {
    default:'',
    postChangeHook:(value, set) => {
      set(false, 'showShow.visible');
    }
  }
};

// Other state is merged with generated form state
// but isn't processed by the form assistant

let otherState = {
  setShow: {
    visible: true,
    someVal: "It's a trap!"
  }

};

~~~~

### Example Form

~~~~


class TestForm extends React.Component {

  constructor(props) {
    super(props);
    // The form assistant handles all of the onChange callbacks and validation callback,
    // as described in the formDescription
    this.formAssistant = new MKFormAssistant(formDescription, otherState, this.handleSubmit, this);
    this.formProps = this.formAssistant.formProps;
    this.state = this.formAssistant.formState;
    this.submitted = {};
  }

  handleSubmit(data) {
    // for testing purposes
    this.submitted = data;
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

                      {/* NAME */}
                      <ValidatedFormGroup
                        label="Name"
                        placeHolder="Choose a public name"
                        {...this.formProps.name}
                        {...this.state.name}
                      />

                      {/* LOCATION */}
                      <ValidatedFormGroup
                        label="Location"
                        placeHolder="Where will the event be held?"
                        {...this.formProps.location}
                        {...this.state.location}
                      />


                      {/* DESCRIPTION */}
                      <ValidatedFormGroup
                        label="Description"
                        inlineHelpBlock="Describe the experience in a couple paragraphs."
                        placeHolder="This retreat is going to be..."
                        componentClass="textarea"
                        controlStyle={{height: "20em"}}
                        {...this.formProps.description}
                        {...this.state.description}
                      />

                    </Well>

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

~~~~
