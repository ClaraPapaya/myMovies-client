import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavbarView } from '../navbar-view/navbar-view';
// Bootstrap components
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
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
      favoriteMovies: []
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    let url = 'https://allmymovies.herokuapp.com/users/' + localStorage.getItem('user');
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.thisState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      });
  }

  // Delete a movie from the fav movie list
  removeFavorite(movie) {
    let token = localStorage.getitem('token');
    let url = 'https://allmymovies.herokuapp.com/users/' + localStorage.getItem('user') + '/favorites/' + movie._id;
    axios.delete(url,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('This movie was deleted from your list.');
        this.componentDidMount();
      });
  }


  // let user delete their profile
  handleDelete() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(
      `https://allmymovies.herokuapp.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert(user + 'was sucessfully deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey='/users'>
            <Nav.Item></Nav.Item>
            <Nav.item></Nav.item>

          </Nav>
        </Card.Header>

        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Card.Text>
            <ListGroup variant="flush">
              <ListGroupItem>Username:<span className='text-color'>{username}</span></ListGroupItem>
              <ListGroupItem>Email:<span className='text-color'>{email}</span></ListGroupItem>
              <ListGroupItem>Birthday:<span className='text-color'>{birthday}</span></ListGroupItem>
              <ListGroupItem>Favorite Movies:</ListGroupItem>
            </ListGroup>
          </Card.Text>
          <Button variant='info' onClick={() => { onBackClick() }}>Back</Button>
          <Button variant='info' onClick={() => { }}>Update Pofile</Button>
          <Button variant='danger' onClick={() => { this.handleDelete() }}>Delete</Button>
        </Card.Body>
      </Card>
    )



  }
}

export default ProfileView;