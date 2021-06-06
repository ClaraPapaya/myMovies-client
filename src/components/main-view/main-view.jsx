import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';
// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export class MainView extends React.Component {
  constructor() {
    super();
    // Inital state is set to null
    this.state = {
      movies: [],
      user: null
    };
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

  // To connect to login-view function component, if successful log in, it updates thes 'user' property in the state
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.userObj.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.userObj.Username);
    localStorage.setItem('email', authData.userObj.Email);
    localStorage.setItem('birthday', authData.userObj.Birthday);
    localStorage.setItem('favoriteMovies', auth.Data.userObj.FavoriteMovies);
    this.getMovies(authData.token);
  }

  // May be used in render(), parts missing
  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null
  //   });
  // }

  render() {
    const { movies, user } = this.state;
    return (
      <Router>
        <Row className='main-view justify-content-md-center'>

          <Route exact path='/' render={() => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>)
            if (movies.length === 0) return <div className='main-view' />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return (
              <Col>
                <RegistrationView />
              </Col>
            )
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return (
              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant='link'>Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant='link'>Genre</Button>
                </Link>
              </Col>
            )
          }} />

          <Route path='/directors/:name' render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path='/genres/:name' render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return (
              <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            )
          }} />

          {/* <Button variant='dark' type='submit' onClick={() => { this.onLoggedOut() }}>Logout
          </Button> */}
        </Row>
      </Router>
    );
  }
}
