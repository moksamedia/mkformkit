/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React, { Component } from 'react';

import {
  FormGroup,
  Checkbox,
  Row,
  Col
} from '@sketchpixy/rubix';

import _ from 'lodash';

import SwitchLabel from './SwitchLabel';

const CheckboxItem = ({value, text, onChange, checked}) => (
  <Checkbox style={{paddingLeft:5}} value={value} checked={checked} onClick={onChange}>{text}</Checkbox>
);

class CheckboxGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.value
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
    const {controlId, items} = this.props;

    const chunks = _.chunk(items, Math.ceil(items.length / 2));

    return (
      <FormGroup controlId={controlId}>
        <SwitchLabel {...this.props}/>
        <Row>
          <Col md={6} sm={12}>
            {chunks[0].map((item) => (
              <CheckboxItem
                key={item.value}
                value={item.value}
                text={item.text}
                onChange={::this.handleChange}
                checked={ _.includes(this.state.selectedValues, item.value) }
              />
            ))}
          </Col>
          <Col md={6} sm={12}>
            {chunks[1].map((item) => (
              <CheckboxItem
                key={item.value}
                value={item.value}
                text={item.text}
                onChange={::this.handleChange}
                checked={ _.includes(this.state.selectedValues, item.value) }
              />
            ))}
          </Col>
        </Row>
      </FormGroup>
    );

  }

}

CheckboxGroup.propTypes = {
  controlId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired,
  required: React.PropTypes.bool
}

export default CheckboxGroup;