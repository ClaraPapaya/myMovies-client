import axios from 'axios';
import React from 'react';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';
// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://allmymovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // To connect to login-view function component
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // have to use it in render()
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // To connect to registration-view function component
  onRegistration(newUser) {
    this.setState({
      newUser
    });
  }

  render() {
    const { movies, user, newUser, selectedMovie } = this.state;
    if (!user) return (
      <Row className='justify-content-md-center'>
        <Col md={5}>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
      </Row>
    );
    if (!newUser) return (
      <Row className='justify-content-md-center'>
        <Col md={5}>
          <RegistrationView onRegistration={register => this.onRegistration(newUser)} />
        </Col>
      </Row>
    );
    if (movies.length === 0) return <Row className='main-view' />;
    return (
      <Row className='main-view justify-content-md-center'>
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          :
          movies.map(movie => (
            <Col md={8}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))
        }
        <Button variant='dark' onClick={() => { this.onLoggedOut() }}>Logout
        </Button>
      </Row>
    );
  }
}
