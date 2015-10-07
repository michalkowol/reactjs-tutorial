import {FilterableMovieTable} from './components';
import {MOVIES} from './movies';
import {OpenClose} from './rt/rtIf'

const moviesLoadSignal = new signals.Signal();
React.render(<FilterableMovieTable moviesLoadSignal={moviesLoadSignal}/>, document.getElementById('demo'));
setTimeout(() => { moviesLoadSignal.dispatch(MOVIES); }, 2500);

React.render(<OpenClose />, document.getElementById('rt-if'));
