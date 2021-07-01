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
  localStorage.removeItem('birthday');
  localStorage.removeItem('favoriteMovies');
  window.open('/', '_self');
}

export class NavbarView extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <Container>
        <Navbar bg='light' expand='lg' fixed='top'>
          <Navbar.Brand href='/'>All My Movies</Navbar.Brand>
          <Navbar.Toggle area-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav activeKey='/' className='mr-auto' >
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/users/me'>Profile</Nav.Link>
            </Nav>
            <Form inline>
              <Form.Control type='text' placeholder='Search Movies by Title' className='mr-sm-2' />
            </Form>
            <Button onClick={() => logOut()} variant='light'>Logout</Button>
          </Navbar.Collapse>
        </Navbar>
      </Container>

    )
  }
}

export default NavbarView;