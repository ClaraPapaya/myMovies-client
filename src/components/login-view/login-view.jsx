// Function component with React Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';
// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggednIn(username);
  };

  return (
    <Form>
      <Form.Group controlID='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlID='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={handleSubmit}>Submit
      </Button>
    </Form>
  );
}

// PropTypes to validate data type input
LoginView.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}