# MoksaMedia Form Assistant for React Bootstrap

This library is a combination of a ES6 form helper class that takes a form description object as an input and simplifies common form tasks such as state management, validation, pre- and post-change hooks, and value extraction for data submission. It is written to work with React Bootstrap, but might be useful with other form systems.

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
