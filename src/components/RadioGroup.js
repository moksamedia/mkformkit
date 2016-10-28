/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React, { Component } from 'react';

import {
  FormGroup,
  Radio,
  HelpBlock
} from './BaseFormElements';

import _ from 'lodash';

import SwitchLabel from './SwitchLabel';

const RadioItem = ({value, text, onChange, checked}) => (
  <Radio style={{paddingLeft:5}} value={value} checked={checked} onClick={onChange}>{text}</Radio>
);

class RadioGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.value
    }
  }

  handleChange(e) {

    var value = e.target.value;

    var newSelectedValues;
    var addingOrRemoving;

    if (this.props.allowsMultiple) {

      if (_.includes(this.state.selectedValues, value)) {
        newSelectedValues = _.without(this.state.selectedValues, value);
        addingOrRemoving = 'removing';
      }
      else {
        newSelectedValues = _.concat(this.state.selectedValues, [value]);
        addingOrRemoving = 'adding';
      }
    }
    else {
      newSelectedValues = [value];
      addingOrRemoving = 'adding';
    }

    this.setState({selectedValues:newSelectedValues});

    if (this.props.allowsMultiple) {
      this.props.handleChange(newSelectedValues, value, addingOrRemoving);
    }
    else {
      this.props.handleChange(value);
    }

  }

  render() {

    if (!this.props.visible) {
      return false;
    }

    let items = this.props.items;
    let {
      controlId,
      formGroupClass,
      formGroupId,
      validationState,
      helpBlock
    } = this.props;

    return (
      <FormGroup controlId={controlId} bsClass={formGroupClass} id={formGroupId} validationState={validationState} >
        <SwitchLabel {...this.props}/>
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
        <div id={controlId}>
          {items.map((item) => (
            <RadioItem
              key={item.value}
              value={item.value}
              text={item.text}
              onChange={::this.handleChange}
              checked={ _.includes(this.state.selectedValues, item.value) }
            />
          ))}
        </div>
      </FormGroup>
    );

  }

}

RadioGroup.propTypes = {
  // required
  controlId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired,
  // optional
  allowsMultiple: React.PropTypes.bool,
  validationState: React.PropTypes.string,
  validationMessage: React.PropTypes.string,
  required: React.PropTypes.bool,
  visible: React.PropTypes.bool,
  helpBlock: React.PropTypes.string,
  inlineHelpBlock: React.PropTypes.string,
  formGroupClass: React.PropTypes.string,
  formGroupId: React.PropTypes.string
};

RadioGroup.defaultProps = {
  allowsMultiple:false,
  visible:true
};

export default RadioGroup;