/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React, { Component } from 'react';
import {
  FormGroup,
  Radio
} from '@sketchpixy/rubix';
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
    let items = this.props.items;
    let {controlId} = this.props;
    return (
      <FormGroup controlId={controlId} >
        <SwitchLabel {...this.props}/>
        {items.map((item) => (
          <RadioItem
            key={item.value}
            value={item.value}
            text={item.text}
            onChange={::this.handleChange}
            checked={ _.includes(this.state.selectedValues, item.value) }
          />
        ))}
      </FormGroup>
    );

  }

}

RadioGroup.propTypes = {
  controlId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  allowsMultiple: React.PropTypes.bool,
  items: React.PropTypes.array.isRequired,
  validationState: React.PropTypes.string,
  validationMessage: React.PropTypes.string,
  required: React.PropTypes.bool
};

RadioGroup.defaultProps = {
  allowsMultiple:false
};

export default RadioGroup;