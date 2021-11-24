import React from 'react';
import PropTypes from 'prop-types';
import { NavbarView } from '../navbar-view/navbar-view';
import './director-view.scss';
// Bootstrap components
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;
    return <div style={{ marginTop: '70px', }}>
      <NavbarView />
      <div className='director-view'>
        <div className='director-name'>
          <span className='label'>Name:</span>
          <span className='value'>{director.Name}</span>
        </div>
        <div className='director-bio'>
          <span className='label'>Biography:</span>
          <span className='value'>{director.Bio}</span>
        </div>
        <Button variant='info' onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    </div>
  }
}

// PropTypes to validate data type
DirectorView.propTypes = {
  Name: PropTypes.string,
  Biography: PropTypes.string
}