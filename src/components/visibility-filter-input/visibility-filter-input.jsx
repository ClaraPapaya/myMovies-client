import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';
// Bootstrap components
import Form from 'react-bootstrap/Form';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder='Search movies by title'
  />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);
