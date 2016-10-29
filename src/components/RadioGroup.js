/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React, { Component } from 'react';

import COMMON_PROPS from './props';

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

RadioGroup.propTypes = Object.assign({}, COMMON_PROPS.types, {
  items: React.PropTypes.array.isRequired,
  allowsMultiple: React.PropTypes.bool
});

RadioGroup.defaultProps = Object.assign({}, COMMON_PROPS.defaults, {
  allowsMultiple:false
});

export default RadioGroup;