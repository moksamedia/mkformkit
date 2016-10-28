/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React, { Component } from 'react';

import {
  FormGroup,
  Checkbox,
  Row,
  Col,
  HelpBlock
} from './BaseFormElements';

import _ from 'lodash';

import SwitchLabel from './SwitchLabel';

const CheckboxItem = ({value, text, onChange, checked}) => (
  <Checkbox style={{paddingLeft:5}} value={value} checked={checked} onClick={onChange}>{text}</Checkbox>
);

class CheckboxGroup2Column extends Component {

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

    if (!this.props.visible) {
      return false;
    }

    const {
      controlId,
      items,
      formGroupClass,
      formGroupId,
      helpBlock,
      validationState
    } = this.props;

    const chunks = _.chunk(items, Math.ceil(items.length / 2));

    return (
      <FormGroup controlId={controlId} bsClass={formGroupClass} id={formGroupId} validationState={validationState} >
        <SwitchLabel {...this.props}/>
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
          <div id={controlId}>
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
        </div>
      </FormGroup>
    );

  }

}

CheckboxGroup2Column.propTypes = {
  // required
  controlId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired,
  // optional
  required: React.PropTypes.bool,
  visible: React.PropTypes.bool,
  validationState: React.PropTypes.string,
  validationMessage: React.PropTypes.string,
  helpBlock: React.PropTypes.string,
  inlineHelpBlock: React.PropTypes.string,
  formGroupClass: React.PropTypes.string,
  formGroupId: React.PropTypes.string
};

CheckboxGroup2Column.defaultProps = {
  visible: true
};

export default CheckboxGroup2Column;