var MarkdownEditor = React.createClass({
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: React.findDOMNode(this.refs.textarea).value});
  },
  rawMarkup: function() {
    return { __html: marked(this.state.value, {sanitize: true}) };
  },
  render: markdownEditorRT
});

React.render(<MarkdownEditor />, document.getElementById('markdown-editor'));