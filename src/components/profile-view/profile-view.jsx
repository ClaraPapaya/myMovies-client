import React from 'react';
import axios from 'axios';
import { NavbarView } from '../navbar-view/navbar-view';
// Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      favoriteMovies: [],
      movies: ''
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    let url =
      'https://allmymovies.herokuapp.com/users/' +
      localStorage.getItem('user');
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      });
  }

  handleDelete() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios
      .delete(
        `https://allmymovies.herokuapp.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(user + ' was deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { username, email, birthday, movies, onBackClick } = this.props;
    const { favoriteMovies } = this.state;

    return <div style={{ marginTop: '70px', }}>
      <div>
        <NavbarView />
      </div>
      <Card style={{ width: '35rem' }}>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Card.Text>
            <ListGroup variant='flush'>
              <ListGroupItem>Username:<span style={{ marginLeft: '5px' }} className='text-color'>{username}</span></ListGroupItem>
              <ListGroupItem>Email:<span style={{ marginLeft: '5px' }} className='text-color'>{email}</span></ListGroupItem>
              <ListGroupItem>Birthday:<span style={{ marginLeft: '5px' }} className='text-color'>{birthday}</span></ListGroupItem>
              <ListGroupItem>Favorite Movies:<span style={{ marginLeft: '5px' }} className='text-color'>{favoriteMovies}</span></ListGroupItem>
            </ListGroup>
          </Card.Text>
          <Button style={{ margin: '3px' }} variant='info' onClick={() => { onBackClick() }}>Back</Button>
          <Button style={{ margin: '3px' }} variant='info' onClick={() => { }}>Update Profile</Button>
          <Button style={{ margin: '3px' }} variant='danger' onClick={() => { this.handleDelete() }}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  }
}

export default ProfileView;

// code from other repos
// favoriteMovies={movies.filter(movie => userData.FavoriteMovies.includes(movie.Title))}
// const favoriteMovieList = movies.filter((movie) => {return this.state.favoriteMovies.includes(movie._id)});