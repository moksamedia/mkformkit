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

The library consists of the MKFormAssistant class that wraps all of the form logic, handling props and state and the various callbacks for changes, validation, and submission, and a a collection of React Bootstrap form element wrapper classes.
