import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { LoginView } from '../login-view/login-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';

import './main-view.scss';
// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainView extends React.Component {
  constructor() {
    super();
    // Inital state is set to null
    this.state = {
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
        this.props.setMovies(response.data);
      })
      .catch(error => {
        this.setState({
          user: null
        });
        localStorage.clear();
        console.log(error);
      });

  }

  // To connect to login-view function component, if successful log in, it updates thes 'user' property in the state
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('favoriteMovies', auth.Data.user.FavoriteMovies);
    this.getMovies(authData.token);
  }

  // to enable user to logout and go back to welcome page
  onLoggedOut() {
    console.log('logout successful');
    this.setState({
      user: null
    });
    localStorage.clear();
  }

  render() {
    const { movies } = this.props;
    const { user } = this.state;
    return (
      <Router>
        <Row className='main-view justify-content-md-center'>

          <Route exact path='/' render={() => {
            if (!user) return (
              <Col style={{ marginTop: '70px', }}>
                <h1>All My Movies</h1>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>)
            if (movies.length === 0) return <div className='main-view' />;
            return <div>
              <NavbarView />
              <Col md={4} style={{ marginTop: '70px', }}>
                <MoviesList movies={movies} />
              </Col>
            </div>
          }} />

          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return <Col md={6}>
              <RegistrationView />
            </Col>
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user)
              return
            <Row>
              <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            </Row>
            if (movies.length === 0) return <div className='main-view' />;
            return (
              <Col md={6} xs={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
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

          <Route path='/users/me' render={({ history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;

            return <ProfileView username={this.state.user} email={localStorage.getItem('email')} birthday={localStorage.getItem('birthday')} movies={this.state.movies} onBackClick={() => history.goBack()} />
          }} />

          <Route path='/update/me' render={({ history }) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className='main-view' />;

            return <Col md={8}>
              <ProfileUpdate movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);