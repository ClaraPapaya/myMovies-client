import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavbarView } from '../navbar-view/navbar-view';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import './movie-view.scss';
// Bootstrap components
import Button from 'react-bootstrap/Button';


class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem('token');
    let url = 'https://allmymovies.herokuapp.com/users/' + this.props.setUser() + '/movies/' + movie._id;
    console.log(token);

    axios
      .post(url, '', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open('/users/me', '_self');
        alert('Added to Favorite Movies!');
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    return <div>
      <div><NavbarView /></div>
      <div className='movie-view' style={{ marginTop: '70px', }}>

        <div className='movie-poster'>
          <img src={movie.ImagePath} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title:</span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description:</span>
          <span className='value'>{movie.Description}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director:</span>
          <Link className='value' to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}
          </Link>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre:</span>
          <Link className='value' to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}
          </Link>
        </div>
        <Button style={{ margin: '3px' }} variant='info' onClick={() => this.addFavorite(movie)}>Add to Favorite Movies</Button>
        <Button style={{ margin: '3px' }} variant='dark' onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    </div>
  };
}

// PropTypes to validate data type
MovieView.propTypes = {
  Title: PropTypes.string,
  Description: PropTypes.string,
  Director: PropTypes.string,
  Genre: PropTypes.string
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(MovieView);