import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'The Dark Knight', Description: 'desc1...', ImagePath: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=ex...' },
        { _id: 2, Title: 'In Bruges', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'The Intouchables', Description: 'desc3...', ImagePath: '...' },
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    if (selectedMovie)
      return <MovieView movie={selectedMovie} />;
    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelevtedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />))}
      </div>
    );
  }
}