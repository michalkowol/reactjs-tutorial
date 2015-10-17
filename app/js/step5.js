const MOVIE_SEARCH_TEXT_CHANGED = 'MOVIE_SEARCH_TEXT_CHANGED';
const MOVIE_FOR_CHILDREN = 'MOVIE_FOR_CHILDREN';
const MOVIES_FOR_ALL = 'MOVIES_FOR_ALL';
const LOAD_MOVIES = 'LOAD_MOVIES';

const AppDispatcher = new Flux.Dispatcher();

const SearchActions = {
  changeSearchText(newText) {
    AppDispatcher.dispatch({
      actionType: MOVIE_SEARCH_TEXT_CHANGED,
      searchText: newText
    });
  },
  toggleMoviesForChildren(forChildren) {
    AppDispatcher.dispatch({
      actionType: forChildren ? MOVIE_FOR_CHILDREN : MOVIES_FOR_ALL
    });
  },
  loadMovies(movies) {
    AppDispatcher.dispatch({
      actionType: LOAD_MOVIES,
      movies: movies
    });
  }
};

const SearchStore = (function () {

  var movies = [];
  var searchText = '';
  var forChildren = false;
  const changed = new signals.Signal();

  AppDispatcher.register(function (action) {
    switch(action.actionType) {
      case MOVIE_SEARCH_TEXT_CHANGED:
        searchText = action.searchText;
        changed.dispatch();
        break;
      case MOVIE_FOR_CHILDREN:
        forChildren = true;
        changed.dispatch();
        break;
      case MOVIES_FOR_ALL:
        forChildren = false;
        changed.dispatch();
        break;
      case LOAD_MOVIES:
        movies = action.movies;
        changed.dispatch();
        break;
      default:
      // no op
    }
  });

  function getMovies() {
    return movies;
  }

  function isForChildren() {
    return forChildren;
  }

  function getSearchText() {
    return searchText;
  }

  function addChangeListener(fn) {
    changed.add(fn);
  }

  return {
    addChangeListener: addChangeListener,
    getMovies: getMovies,
    isForChildren: isForChildren,
    getSearchText: getSearchText
  };
})();



const FilterableMovieTable = React.createClass({
  onChange() {
    this.setState({
      movies: SearchStore.getMovies(),
      searchText: SearchStore.getSearchText(),
      forChildren: SearchStore.isForChildren()
    });
  },
  componentDidMount() {
    SearchStore.addChangeListener(this.onChange);
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
              searchText={this.state.searchText}
              forChildren={this.state.forChildren}
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

React.render(<FilterableMovieTable />, document.getElementById('demo'));
SearchActions.loadMovies(MOVIES);
