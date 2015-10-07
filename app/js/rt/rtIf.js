import template from './rtIf.rt';

export const OpenClose = React.createClass({
  getInitialState() {
    return {open: false};
  },
  toggle() {
    this.setState({open: !this.state.open});
  },
  render: template
});