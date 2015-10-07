var FilterableMovieTable = React.createClass({
  onUserInput(searchText, forChildren) {
    this.setState({
      searchText: searchText,
      forChildren: forChildren
    });
  },
  onMovieLoad(movies) {
    this.setState({movies: movies});
  },
  componentDidMount() {
    this.props.moviesLoadSignal.add(this.onMovieLoad);
  },
  getInitialState() {
    return {
      searchText: '',
      forChildren: false,
      movies: []
    };
  },
  render() {
    return (
        <div>
          <SearchBar
              searchText={this.state.searchText}
              forChildren={this.state.forChildren}
              onUserInput={this.onUserInput}
              />
          <MovieTable
              movies={this.state.movies}
              searchText={this.state.searchText}
              forChildren={this.state.forChildren}
              />
        </div>
    );
  }
});

var SearchBar = React.createClass({
  handleUserInput() {
    var searchText = this.refs.SearchInput.getDOMNode().value;
    var forChildren = this.refs.ForChildrenInput.getDOMNode().checked;
    this.props.onUserInput(searchText, forChildren);
  },
  render() {
    return (
        <div>
          <input type="text" placeholder="Search..." value={this.props.searchText} onChange={this.handleUserInput} ref="SearchInput"/>

          <p><input type="checkbox" checked={this.props.forChildren} onChange={this.handleUserInput} ref="ForChildrenInput"/> Movie for children</p>
        </div>
    );
  }
});

var MovieTable = React.createClass({
  render() {
    var filteredMovies = _.filter(this.props.movies, movie => {
      return (movie.forChildren || this.props.forChildren === movie.forChildren) && movie.name.indexOf(this.props.searchText) !== -1;
    });
    var rows = _.map(filteredMovies, movie => {
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

var MovieRow = React.createClass({
  render() {
    var name = this.props.movie.forChildren ? this.props.movie.name : <span style={{color: 'red'}}>{this.props.movie.name}</span>;
    return (
        <tr>
          <td>{name}</td>
          <td>{this.props.movie.genre}</td>
        </tr>
    );
  }
});

var moviesLoadSignal = new signals.Signal();
React.render(<FilterableMovieTable moviesLoadSignal={moviesLoadSignal}/>, document.getElementById('step4'));
moviesLoadSignal.dispatch(MOVIES);
