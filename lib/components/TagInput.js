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

var _reactTagInput = require('react-tag-input');

var _BaseFormElements = require('./BaseFormElements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagInput = function (_Component) {
  (0, _inherits3.default)(TagInput, _Component);

  function TagInput(props) {
    (0, _classCallCheck3.default)(this, TagInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      tags: [],
      suggestions: []
    };

    return _this;
  }

  TagInput.prototype.handleDelete = function handleDelete(i) {
    var tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
    this.props.handleChange(tags);
  };

  TagInput.prototype.handleAddition = function handleAddition(tag) {
    var tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({ tags: tags });
    this.props.handleChange(tags);
  };

  TagInput.prototype.handleDrag = function handleDrag(tag, currPos, newPos) {
    var tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
    this.props.handleChange(tags);
  };

  TagInput.prototype.render = function render() {

    var tags = this.state.tags;
    var suggestions = this.state.suggestions;
    var controlId = this.props.controlId;
    var helpBlock = this.props.helpBlock;

    return _react2.default.createElement(
      _BaseFormElements.FormGroup,
      { controlId: controlId, validationState: validationState },
      _react2.default.createElement(SwitchLabel, this.props),
      helpBlock ? _react2.default.createElement(
        _BaseFormElements.HelpBlock,
        null,
        helpBlock
      ) : null,
      _react2.default.createElement(_reactTagInput.WithContext, {
        id: controlId,
        tags: tags,
        suggestions: suggestions,
        handleDelete: this.handleDelete.bind(this),
        handleAddition: this.handleAddition.bind(this),
        handleDrag: this.handleDrag.bind(this)
      })
    );
  };

  return TagInput;
}(_react.Component); /**
                      * Created by cantgetnosleep on 10/5/16.
                      */

TagInput.propTypes = {
  controlId: _react2.default.PropTypes.string.isRequired,
  label: _react2.default.PropTypes.string.isRequired,
  helpBlock: _react2.default.PropTypes.string,
  handleChange: _react2.default.PropTypes.func.isRequired,
  items: _react2.default.PropTypes.array.isRequired,
  required: _react2.default.PropTypes.bool,
  visible: _react2.default.PropTypes.bool,
  validationState: _react2.default.PropTypes.string,
  validationMessage: _react2.default.PropTypes.string,
  inlineHelpBlock: _react2.default.PropTypes.string
};

TagInput.defaultValues = {
  required: false,
  visible: true,
  validationState: null,
  validationMessage: null,
  helpBlock: null
};

exports.default = TagInput;