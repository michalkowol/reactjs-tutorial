const AppDispatcher = {
  loadMovies: new signals.Signal(),
  moviesForAll: new signals.Signal(),
  moviesForChildren: new signals.Signal(),
  changeSearchText: new signals.Signal()
};

const SearchActions = {
  changeSearchText(newText) {
    AppDispatcher.changeSearchText.dispatch(newText);
  },
  toggleMoviesForChildren(forChildren) {
    forChildren ? AppDispatcher.moviesForChildren.dispatch() : AppDispatcher.moviesForAll.dispatch();
  },
  loadMovies(movies) {
    AppDispatcher.loadMovies.dispatch(movies);
  }
};

const SearchStore = (function () {

  var movies = [];
  var searchText = '';
  var forChildren = false;
  const changed = new signals.Signal();

  AppDispatcher.changeSearchText.add(function (newSearchText) {
    searchText = newSearchText;
    changed.dispatch();
  });

  AppDispatcher.moviesForAll.add(function () {
    forChildren = false;
    changed.dispatch();
  });

  AppDispatcher.moviesForChildren.add(function () {
    forChildren = true;
    changed.dispatch();
  });

  AppDispatcher.loadMovies.add(function (newMovies) {
    movies = newMovies;
    changed.dispatch();
  });

  function isForChildren() {
    return forChildren;
  }

  function getSearchText() {
    return searchText;
  }

  function addChangeListener(fn) {
    changed.add(fn);
  }

  function removeChangeListener(fn) {
    changed.remove(fn);
  }

  function filteredMovies() {
    const filteredMovies = _.filter(movies, movie => {
      return (movie.forChildren || forChildren === movie.forChildren) && movie.name.indexOf(searchText) !== -1;
    });
    return filteredMovies;
  }

  return {
    filteredMovies: filteredMovies,
    isForChildren: isForChildren,
    getSearchText: getSearchText,
    addChangeListener: addChangeListener,
    removeChangeListener: removeChangeListener
  };
})();



const FilterableMovieTable = React.createClass({
  onChange() {
    this.setState({
      movies: SearchStore.filteredMovies(),
      searchText: SearchStore.getSearchText(),
      forChildren: SearchStore.isForChildren()
    });
  },
  componentDidMount() {
    SearchStore.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    SearchStore.removeChangeListener(this.onChange);
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
              />
          <MovieTable
              movies={this.state.movies}
              />
        </div>
    );
  }
});

const SearchBar = React.createClass({
  forChildrenCheckboxChanged() {
    const forChildren = React.findDOMNode(this.refs.ForChildrenInput).checked;
    SearchActions.toggleMoviesForChildren(forChildren);
  },
  searchTextChanged() {
    const searchText = React.findDOMNode(this.refs.SearchInput).value;
    SearchActions.changeSearchText(searchText);
  },
  render() {
    return (
        <div>
          <input type="text" placeholder="Search..." value={this.props.searchText} onChange={this.searchTextChanged} ref="SearchInput"/>

          <p><input type="checkbox" checked={this.props.forChildren} onChange={this.forChildrenCheckboxChanged} ref="ForChildrenInput"/> Movie for children</p>
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

React.render(<FilterableMovieTable />, document.getElementById('demo'));
SearchActions.loadMovies(MOVIES);
