// Function component with React Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { NavbarView } from '../navbar-view/navbar-view';
// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefaut();
    // Send a request to the server to register a new user
    axios.post('https://allmymovies.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // '_self' is necessary so that the page opens in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });

    return (
      <div>
        <NavbarView />
        <Form>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='text' onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type='date' onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Button variant='info' type='submit' onClick={handleSubmit}>Register
          </Button>
        </Form>
      </div>
    );
  }

  // PropTypes to validate data type input
  RegistrationView.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.date
  }
}