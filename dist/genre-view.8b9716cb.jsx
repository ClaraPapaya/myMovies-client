import React from 'react';
import PropTypes from 'prop-types';
import { NavbarView } from '../navbar-view/navbar-view';
import './genre-view.scss';
// Bootstrap components
import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    return <div style={{ marginTop: '70px', }}>
      <NavbarView />
      <div className='genre-view'>
        <div className='genre-name'>
          <span className='label'>Name:</span>
          <span className='value'>{genre.Name}</span>
        </div>
        <div className='genre-description'>
          <span className='label'>Description:</span>
          <span className='value'>{genre.Description}</span>
        </div>
        <Button variant='info' onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    </div>
  }
}

// PropTypes to validate data type
GenreView.propTypes = {
  Name: PropTypes.string,
  Description: PropTypes.string
}