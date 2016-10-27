/**
 * Created by cantgetnosleep on 10/5/16.
 */

import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import {
  FormGroup,
  ControlLabel,
  HelpBlock
} from '@sketchpixy/rubix';

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
    this.props.onChange(tags);
  }

  handleAddition(tag) {
    console.log(this.state);
    let tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({tags: tags});
    this.props.onChange(tags);
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
    this.props.onChange(tags);
  }

  render() {

    let tags = this.state.tags;
    let suggestions = this.state.suggestions;
    let controlId = this.props.controlId;
    let label = this.props.label;
    let helpBlock = this.props.helpBlock;

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        { helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : null }
        <ReactTags
          id={controlId}
          tags={tags}
          suggestions={suggestions}
          handleDelete={::this.handleDelete}
          handleAddition={::this.handleAddition}
          handleDrag={::this.handleDrag}
        />
      </FormGroup>
    )
  }
}

export default TagInput;