import axios from 'axios';
import React from 'react';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      newUser: null
    }
  }

  componentDidMount() {
    axios.get('https://allmymovies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // To connect to login-view function component
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // To connect to registration-view function component
  onRegistration(newUser) {
    this.setState({
      newUser
    });
  }

  render() {
    const { movies, user, selectedMovie } = this.state;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!newUser) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;
    if (movies.length === 0)
      return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />))}
      </div>
    );
  }
}