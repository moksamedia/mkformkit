/**
 * Created by cantgetnosleep on 10/4/16.
 */

import React from 'react';

import {DateRangePicker} from 'react-dates';
import momentPropTypes from 'react-moment-proptypes';
import SwitchLabel from './SwitchLabel';

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

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
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

    const { focusedInput, startDate, endDate } = this.state;
    const {controlId, validationState, formGroupStyle, validationMessage} = this.props;

    return (
      <FormGroup validationState={validationState} style={formGroupStyle}>
        <SwitchLabel {...this.props} />
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
        <DateRangePicker
          id={controlId}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          {...this.props}
        />
      </FormGroup>
    );

  }

}

DateRangePickerWrapper.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  validationState: React.PropTypes.bool,
  validationMessage: React.PropTypes.string,
  formGroupStyle: React.PropTypes.string,
  controlId: React.PropTypes.string,
  required: React.PropTypes.bool,
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  visible: React.PropTypes.bool,
  helpBlock: React.PropTypes.string,
  helpBlock: React.PropTypes.string,
  inlineHelpBlock: React.PropTypes.string
};

DateRangePickerWrapper.defaultProps = {
  required: false,
  visible: true,
  validationState: null,
  validationMessage: null
};


export default DateRangePickerWrapper;