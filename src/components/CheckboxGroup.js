/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React, { Component } from 'react';

import COMMON_PROPS from './props';

import {
  FormGroup,
  Checkbox,
  HelpBlock
} from './BaseFormElements';

import _ from 'lodash';

import SwitchLabel from './SwitchLabel';

const CheckboxItem = ({value, text, onChange, checked}) => (
  <Checkbox style={{paddingLeft:5}} value={value} checked={checked} onClick={onChange}>{text}</Checkbox>
);

class CheckboxGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValues: []
    }
  }

  handleChange(e) {

    var value = e.target.value;

    var newSelectedValues;

    if (_.includes(this.state.selectedValues, value)) {
      newSelectedValues = _.without(this.state.selectedValues, value);
    }
    else {
      newSelectedValues = _.concat(this.state.selectedValues, [value]);
    }

    this.setState({selectedValues:newSelectedValues});

    this.props.handleChange(newSelectedValues, value);

  }

  render() {

    if (!this.props.visible) {
      return false;
    }

    const {
      controlId,
      items,
      validationState,
      helpBlock,
      formGroupClass,
      formGroupId
    } = this.props;

    return (

      <FormGroup validationState={validationState} bsClass={formGroupClass} id={formGroupId} >
        <SwitchLabel {...this.props} />
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
        <div id={controlId}>
          {items.map((item) => (
            <CheckboxItem
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

CheckboxGroup.propTypes = Object.assign({}, COMMON_PROPS.types, {
  items: React.PropTypes.array.isRequired
});

CheckboxGroup.defaultProps = COMMON_PROPS.defaults;;

export default CheckboxGroup;