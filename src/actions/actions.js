// actionTypes
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAV = 'ADD_FAV';
export const REM_FAV = 'REM_FAV';
export const REM_USER = 'REM_USER';

// action creators
export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}
export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}

export function addFav(value) {
  return {
    type: ADD_FAV,
    value
  };
}

export function remFav(value) {
  return {
    type: REM_FAV,
    value
  };
}

export function remUser(value) {
  return {
    type: REM_USER,
    value
  };
}