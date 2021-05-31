import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return
    <Card>
      <Card.Img variant='top' src={movie.Imaage.Path} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant='link'>Open
      </Button>
      </Card.Body>
    </Card>
  }
}

// PropTypes to validate data type
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};