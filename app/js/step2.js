const FilterableMovieTable = React.createClass({
  getInitialState() {
    return {
      searchText: '',
      forChildren: false
    };
  },
  render() {
    return (
        <div>
          <SearchBar
              searchText={this.state.searchText}
              forChildren={this.state.forChildren}
              />
          <MovieTable
              movies={this.props.movies}
              searchText={this.state.searchText}
              forChildren={this.state.forChildren}
              />
        </div>
    );
  }
});

const SearchBar = React.createClass({
  render() {
    return (
        <div>
          <input type="text" placeholder="Search..." value={this.props.searchText}/>

          <p><input type="checkbox" checked={this.props.forChildren} onChange={this.handleUserInput}/> Movie for children</p>
        </div>
    );
  }
});

const MovieTable = React.createClass({
  render() {
    const filteredMovies = _.filter(this.props.movies, movie => {
      return (movie.forChildren || this.props.forChildren === movie.forChildren) && movie.name.indexOf(this.props.searchText) !== -1;
    });
    const rows = _.map(filteredMovies, movie => {
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

React.render(<FilterableMovieTable movies={MOVIES}/>, document.getElementById('step2'));
