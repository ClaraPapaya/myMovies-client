// Function component with React Hook
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './login-view.scss';
// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    axios.post('https://allmymovies.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        console.log('data', data);
        props.onLoggedIn(data);
        window.open('/');
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;

    if (username.trim().length < 1) {
      usernameError.usernameShort = 'Username is required';
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = 'Password is required';
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };

  return (
    <Form>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      {Object.keys(usernameError).map((key) => {
        return (
          <div key={key}>
            {usernameError[key]}
          </div>
        );
      })}

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      {Object.keys(passwordError).map((key) => {
        return (
          <div key={key}>
            {passwordError[key]}
          </div>
        );
      })}

      <Button style={{ margin: '3px' }} variant='info' type='submit' onClick={handleSubmit}>Log in
      </Button>

      <Link to={'/register'}>
        <Button style={{ margin: '3px' }} variant='dark' >Register</Button>
      </Link>
    </Form>
  );
}

// PropTypes to validate data type input
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func
};