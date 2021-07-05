import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function ProfileUpdate(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});

  const onBackClick = props.onBackClick;

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    const url = 'https://allmymovies.herokuapp.com/users/' + localStorage.getItem('user');

    if (isValid) {
      axios
        .put(url,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
          }
        )
        .then((response) => {
          const data = response.data;
          localStorage.setItem('user', data.Username);
          localStorage.setItem('email', data.Email);
          localStorage.setItem('birthday', data.Birthday);
          alert('Profile updated successfully.');
          window.open('/', '_self');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = 'Minimum 5 characters.';
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordError.passwordMissing = 'Password is required.';
      isValid = false;
    }

    if (!email.includes('.') && !email.includes('@')) {
      emailError.emailNotEmail = 'Email is not valid.';
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };

  return (
    <div>
      <h1>Update your profile</h1>
      <Form className='registration-form'>
        <Form.Group controlId='formBasicUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            value={username}
            placeholder='Username'
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {Object.keys(usernameError).map((key) => {
            return (
              <div key={key}>
                {usernameError[key]}
              </div>
            );
          })}
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {Object.keys(passwordError).map((key) => {
            return (
              <div key={key}>
                {passwordError[key]}
              </div>
            );
          })}
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type='text'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='email@adress.com'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {Object.keys(emailError).map((key) => {
            return (
              <div key={key}>
                {emailError[key]}
              </div>
            );
          })}
        </Form.Group>
        <Link to={`/users`}>
          <Button style={{ margin: '3px' }} variant='info' type='submit' onClick={handleUpdate}>Save</Button>
        </Link>
        <Button style={{ margin: '3px' }} variant='dark' onClick={onBackClick}>Back</Button>
      </Form>
    </div>
  );
}