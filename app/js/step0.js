const Hello = React.createClass({
  render() {
    return <h1>Hello {this.props.name}!</h1>
  }
});

const FilterableMovieTable = React.createClass({render() { return <div /> }});
const SearchBar = React.createClass({render() { return <div /> }});
const MovieTable = React.createClass({render() { return <div /> }});
const MovieRow = React.createClass({render() { return <div /> }});

React.render(<Hello name={'Michal'} />, document.getElementById('step0'));
