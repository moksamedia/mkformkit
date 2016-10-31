/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React from 'react';

import {DateRangePicker} from 'react-dates';
import momentPropTypes from 'react-moment-proptypes';
import SwitchLabel from './SwitchLabel';

import COMMON_PROPS from './props';

import {
  FormGroup
} from './BaseFormElements';

class DateRangePickerWrapper extends React.Component {

  constructor(props) {

    super(props);

    if (props.value && _.has(props.value, 'start') && _.has(props.value, 'end')) {
      this.state = {
        focusedInput: null,
        startDate: props.value.start,
        endDate: props.value.end,
      };
    }
    else {
      this.state = {
        focusedInput: null,
        startDate: null,
        endDate: null,
      };
    }

    //this.onDatesChange = this.onDatesChange.bind(this);
    //this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate })
    // only send update when both values are set
    if (startDate != null && endDate != null) {
      this.props.handleChange({ startDate, endDate });
    }
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {

    if (!this.props.visible) {
      return false;
    }

    const {
      controlId,
      formGroupClass,
      formGroupId,
      formGroupStyle,
      helpBlock,
      validationState
    } = this.props;

    return (
      <FormGroup controlId={controlId} validationState={validationState} bsClass={formGroupClass} id={formGroupId} style={formGroupStyle}>
        <SwitchLabel {...this.props} />
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
        <DateRangePicker
          onDatesChange={::this.onDatesChange}
          onFocusChange={::this.onFocusChange}
          {...this.state}
        />
      </FormGroup>
    );

  }

}

DateRangePickerWrapper.propTypes = Object.assign({}, COMMON_PROPS.types, {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj
});

DateRangePickerWrapper.defaultProps = COMMON_PROPS.defaults;


export default DateRangePickerWrapper;