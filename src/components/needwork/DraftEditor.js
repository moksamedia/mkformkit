/**
 * Created by cantgetnosleep on 10/4/16.
 */
import React from 'react';
import {Editor, EditorState} from 'draft-js';

export default class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    const {editorState} = this.state;
    return <Editor editorState={editorState} onChange={this.onChange} />;
  }
}
