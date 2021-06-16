import React from 'react';
// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let logOut = function () {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  localStorage.removeItem('borthday');
  localStorage.removeItem('favoriteMovies');
  window.open('/', '_self');
}

export class NavbarView extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Button onClick={() => logOut()} variant='outline-light'>Logout</Button>
    )
  }
}