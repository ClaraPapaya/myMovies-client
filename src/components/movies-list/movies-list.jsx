import React from 'react';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import './movies-list.scss';
// Bootstrap components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const mapStateToProps = state => {
  const { visibilityFilter, movies } = state;
  return { visibilityFilter, movies };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className='main-view' />;

  return <>
    <Row>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map(m => (
        <Col md={4} key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </Row>
  </>
};

export default connect(mapStateToProps)(MoviesList);