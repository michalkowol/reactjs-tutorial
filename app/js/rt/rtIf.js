var OpenClose = React.createClass({
  getInitialState() {
    return {open: false};
  },
  toggle() {
    this.setState({open: !this.state.open});
  },
  render: rtIfRT
});

React.render(<OpenClose />, document.getElementById('rt-if'));