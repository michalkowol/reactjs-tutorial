const FilterableMovieTable = React.createClass({
  render() {
    return (
        <div>
          <SearchBar />
          <MovieTable movies={this.props.movies}/>
        </div>
    );
  }
});

const SearchBar = React.createClass({
  render() {
    return (
        <div>
          <input type="text" placeholder="Search..."/>

          <p><input type="checkbox" /> Movie for children</p>
        </div>
    );
  }
});

const MovieTable = React.createClass({
  render() {
    const rows = _.map(this.props.movies, movie => {
      return <MovieRow movie={movie}/>
    });
    return (
        <table>
          <thead>
          <th>Name</th>
          <th>Genre</th>
          </thead>
          <tbody>{rows}</tbody>
        </table>
    );
  }
});

const MovieRow = React.createClass({
  render() {
    const name = this.props.movie.forChildren ? this.props.movie.name : <span style={{color: 'red'}}>{this.props.movie.name}</span>;
    return (
        <tr>
          <td>{name}</td>
          <td>{this.props.movie.genre}</td>
        </tr>
    );
  }
});

React.render(<FilterableMovieTable movies={MOVIES}/>, document.getElementById('step1'));
