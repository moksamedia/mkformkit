/**
 * Created by cantgetnosleep on 10/4/16.
 */
import React, {Component} from "react";
import {FormGroup, FormControl, ControlLabel} from "./BaseFormElements";

class DateTimePicker extends Component {

  constructor(props) {
    super(props);
  }

  setupPicker() {
    $('#'+this.props.componentId).datetimepicker(this.props.options);
    $('#'+this.props.componentId).on('dp.change', this.props.onChange);
  }

  componentDidMount() {
    this.setupPicker();
  }

  componentDidUpdate() {
    this.setupPicker();
  }

  render() {
    return (
      <FormGroup controlId={this.props.formGroupId} validationState={validationState}>
        <SwitchLabel {...this.props}/>
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
        <div className='input-group date' id={this.props.componentId} >
          <input type='text' className="form-control" />
          <span className="input-group-addon">
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
        </div>
        <FormControl.Feedback />
      </FormGroup>
    )
  }
}

DateTimePicker.propTypes = {
  controlId: React.PropTypes.string.isRequired,
  formGroupId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.object
}

DateTimePicker.defaultProps = {
  options:{format:'MM/DD/YYYY'}
}

export default DateTimePicker;