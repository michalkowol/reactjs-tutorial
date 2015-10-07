var Hello = React.createClass({
  render() {
    return <h1>Hello {this.props.name}!</h1>
  }
});

var FilterableMovieTable = React.createClass({render() { return <div /> }});
var SearchBar = React.createClass({render() { return <div /> }});
var MovieTable = React.createClass({render() { return <div /> }});
var MovieRow = React.createClass({render() { return <div /> }});

React.render(<Hello name={'Michal'} />, document.getElementById('step0'));
