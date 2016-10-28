'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cantgetnosleep on 10/4/16.
 */
var DraftEditor = function (_React$Component) {
  (0, _inherits3.default)(DraftEditor, _React$Component);

  function DraftEditor(props) {
    (0, _classCallCheck3.default)(this, DraftEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

    _this.state = { editorState: _draftJs.EditorState.createEmpty() };
    _this.onChange = function (editorState) {
      return _this.setState({ editorState: editorState });
    };
    return _this;
  }

  DraftEditor.prototype.render = function render() {
    var editorState = this.state.editorState;

    return _react2.default.createElement(_draftJs.Editor, { editorState: editorState, onChange: this.onChange });
  };

  return DraftEditor;
}(_react2.default.Component);

exports.default = DraftEditor;