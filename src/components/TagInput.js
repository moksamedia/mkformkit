/**
 * Created by cantgetnosleep on 10/5/16.
 */

import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input'; // https://www.npmjs.com/package/react-tag-input
import {
  FormGroup,
  ControlLabel,
  HelpBlock
} from './BaseFormElements';

import SwitchLabel from './SwitchLabel'

class TagInput extends Component {

  constructor(props) {

    super(props);

    this.state = {
      tags: [],
      suggestions: []
    }

  }

  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
    this.props.handleChange(tags);
  }

  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({tags: tags});
    this.props.handleChange(tags);
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
    this.props.handleChange(tags);
  }

  render() {

    let tags = this.state.tags;
    let suggestions = this.state.suggestions;

    let {
      controlId,
      helpBlock,
      validationState,
      visible,
      formGroupClass,
      formGroupId
    } = this.props;

    if (!visible) {
      return null;
    }
    else {
      return (
        <FormGroup controlId={controlId} validationState={validationState} bsClass={formGroupClass} id={formGroupId} >
          <SwitchLabel {...this.props} />
          { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
          <div id={controlId}>
            <ReactTags
              id={controlId}
              tags={tags}
              suggestions={suggestions}
              handleDelete={::this.handleDelete}
              handleAddition={::this.handleAddition}
              handleDrag={::this.handleDrag}
            />
          </div>
        </FormGroup>
      )

    }

  }
}

TagInput.propTypes = {
  controlId: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  helpBlock: React.PropTypes.string,
  handleChange: React.PropTypes.func.isRequired,

  required: React.PropTypes.bool,
  visible: React.PropTypes.bool,
  validationState: React.PropTypes.string,
  validationMessage: React.PropTypes.string,
  inlineHelpBlock: React.PropTypes.string,
  formGroupClass: React.PropTypes.string,
  formGroupId: React.PropTypes.string
};

TagInput.defaultProps = {
  required: false,
  visible: true,
  validationState: null,
  validationMessage: null,
  helpBlock: null
};


export default TagInput;