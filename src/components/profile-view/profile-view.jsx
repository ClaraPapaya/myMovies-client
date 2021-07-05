import React from 'react';
import axios from 'axios';
import { NavbarView } from '../navbar-view/navbar-view';
// Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Link } from 'react-router-dom';

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

  removeFavorite(movie) {
    let token = localStorage.getItem('token');
    let url = 'https://allmymovies.herokuapp.com/users/' + localStorage.getItem('user') + '/movies/' + movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('This movie was removed.');
        this.componentDidMount();
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
    const favoriteMovieList = movies.filter((movie) => { return favoriteMovies.includes(movie._id) });

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
              <ListGroupItem>Favorite Movies:<span style={{ marginLeft: '5px' }} className='text-color'></span>
                {favoriteMovieList.map((movie) => {
                  return (
                    <Col md={6} key={movie._id}>
                      <div>{movie.Title}</div>
                      <Button variant='outline-danger' size='sm' onClick={() => this.removeFavorite(movie)}>Remove</Button>
                    </Col>

                  )
                })}</ListGroupItem>
            </ListGroup>
          </Card.Text>
          <Button style={{ margin: '3px' }} variant='info' onClick={() => { onBackClick() }}>Back</Button>
          <Link to={`/update/${this.state.username}`}>
            <Button style={{ margin: '3px' }} variant='info'>Edit Profile</Button>
          </Link>
          <Button style={{ margin: '3px' }} variant='danger' onClick={() => { this.handleDelete() }}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  }
}

export default ProfileView;