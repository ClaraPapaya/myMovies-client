import { combineReducers } from 'redux';
import { SET_MOVIES, SET_FILTER, SET_USER, ADD_FAV, REM_FAV, REM_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  let user = state;
  console.log(action);
  switch (action.type) {
    case SET_USER:
      localStorage.setItem('username', action.value.Username);
      return action.value;
    case ADD_FAV:
      user.FavoriteMovies.push(action.value);
      return user;
    case REM_FAV:
      user.FavoriteMovies = user.FavoriteMovies.filter((movie) => {
        return movie != action.value
      });
      return user;
    case REM_USER:
      return null;
    default:
      return state;
  }
}



const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;