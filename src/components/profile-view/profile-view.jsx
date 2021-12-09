import React from 'react';
import axios from 'axios';
import { NavbarView } from '../navbar-view/navbar-view';
import { connect } from 'react-redux';
import { setUser, remFav, remUser } from '../../actions/actions';
import { Link } from 'react-router-dom';
// Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


class ProfileView extends React.Component {

  removeFavorite(movie) {
    let token = localStorage.getItem('token');
    let url = 'https://allmymovies.herokuapp.com/users/' + this.props.user.Username + '/movies/' + movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        this.props.remFav(movie._id);
        alert('This movie was removed.');
      });
  }

  handleDelete() {
    let token = localStorage.getItem('token');
    let user = this.props.user.Username;
    axios
      .delete(
        `https://allmymovies.herokuapp.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(user + ' was deleted');
        this.props.remUser(true);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/#', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { Username, Email, Birthday, FavoriteMovies } = this.props.user;
    const { movies, onBackClick } = this.props;
    const favoriteMovieList = movies.filter((movie) => {
      return this.props.FavoriteMovies.includes(movie._id)
    });

    return <div style={{ marginTop: '70px', }}>
      <div>
        <NavbarView />
      </div>
      <Card style={{ width: '35rem' }}>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Card.Text>
            <ListGroup variant='flush'>
              <ListGroupItem>Username:<span style={{ marginLeft: '5px' }} className='text-color'>{Username}</span></ListGroupItem>
              <ListGroupItem>Email:<span style={{ marginLeft: '5px' }} className='text-color'>{Email}</span></ListGroupItem>
              <ListGroupItem>Birthday:<span style={{ marginLeft: '5px' }} className='text-color'>{Birthday}</span></ListGroupItem>
              <ListGroupItem>Favorite Movies:<span style={{ marginLeft: '5px' }} className='text-color'></span>
                {favoriteMovieList.map((movie) => {
                  return (
                    <Col md={6} key={movie._id}>
                      <h6>{movie.Title}</h6>
                      <Button variant='outline-danger' size='sm' onClick={() => this.removeFavorite(movie)}>Remove</Button>
                    </Col>
                  )
                })}</ListGroupItem>
            </ListGroup>
          </Card.Text>
          <Button style={{ margin: '3px' }} variant='info' onClick={() => { onBackClick() }}>Back</Button>
          <Link to='/update/me'>
            <Button style={{ margin: '3px' }} variant='info'>Edit Profile</Button>
          </Link>
          <Button style={{ margin: '3px' }} variant='danger' onClick={() => { this.handleDelete() }}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  }
}

const mapStateToProps = state => {
  const { movies, user } = state;
  return { movies, user, FavoriteMovies: user.FavoriteMovies };
};
export default connect(mapStateToProps, { setUser, remFav, remUser })(ProfileView);