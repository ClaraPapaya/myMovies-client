// Function component with React Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
// Bootstrap components
import Form from 'react-bootstrap/Form';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefaut();
    console.log(username, password, email, birthday);
    props.onRegistration(newUser);
  };

  return (
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

      <Button variant='info' type='submit' onClick={handleSubmit}>Submit
      </Button>
    </Form>
  );
}

// PropTypes to validate data type input
RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.date
}