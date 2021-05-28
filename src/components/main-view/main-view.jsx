import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: ' The Dark Knight', Description: ' When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg', Director: ' Christopher Nolan', Genre: ' Action' },
        { _id: 2, Title: ' In Bruges', Description: ' Guilt-stricken after a job gone wrong, hitman Ray and his partner await orders from their ruthless boss in Bruges, Belgium, the last place in the world Ray wants to be at.', ImagePath: 'https://images-na.ssl-images-amazon.com/images/I/51cY5wrSoDL.jpg', Director: ' Martin McDonagh', Genre: ' Comedy' },
        { _id: 3, Title: ' The Intouchables', Description: ' After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver and an unlikely friendship unfolds.', ImagePath: 'https://images-na.ssl-images-amazon.com/images/I/81G5tvlZehL._SY679_.jpg', Director: ' Olivier Nakache', Genre: ' Comedy' },
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
    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />))}
      </div>
    );
  }
}