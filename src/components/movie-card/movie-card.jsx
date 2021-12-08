import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card style={{ marginTop: '70px' }}>
        <Card.Img variant='top' src={movie.ImagePath} as='img' crossOrigin='true' />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='info'>Open</Button>
          </Link>
        </Card.Body>
      </Card>

    );
  }
}

// PropTypes to validate data type
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
};