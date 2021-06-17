import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavbarView } from '../navbar-view/navbar-view';
import './movie-view.scss';
// Bootstrap components
import Button from 'react-bootstrap/Button';


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return <div className='movie-view'>
      <NavbarView />
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
      <Button variant='info' onClick={() => { onBackClick(null); }}>Back</Button>
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