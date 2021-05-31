import React from 'react';
import PropTypes from 'prop-types';
import './movie-view';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.ImagePath} />
      </div>
      <div className="movie-title">
        <span className="label">Title:</span>
        <span className="value">{movie.Title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description:</span>
        <span className="value">{movie.Description}</span>
      </div>
      <div className="movie-director">
        <span className="label">Director:</span>
        <span className="value">{movie.Director.Name}</span>
      </div>
      <div className="movie-genre">
        <span className="label">Genre:</span>
        <span className="value">{movie.Genre.Name}</span>
      </div>
      <button onClick={() => { onBackClick(null); }}>Back</button>
    </div>
  };
}

// PropTypes to validate data type
MovieView.PropTypes = {
  Title: PropType.string,
  Description: PropTypes.string,
  Director: PropTypes.string,
  Genre: PropTypes.string
}