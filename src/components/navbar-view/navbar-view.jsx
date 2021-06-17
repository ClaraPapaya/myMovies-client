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
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand href=''>All My Movies</Navbar.Brand>
        <Navbar.Toggle area-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav activeKey='/' onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
            <Nav.Item>
              <Nav.Link href='/'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/users/${user}'>Profile</Nav.Link>
            </Nav.Item>
          </Nav>
          <Form inline>
            <Form.Control type='text' placeholder='Search' className='mr-sm-2' />
            <Button type='submit'>Submit</Button>
          </Form>
          <Navbar.Text>Signed in as: <a href='#login'>Username</a></Navbar.Text>
          <Button onClick={() => logOut()} variant='light'>Logout</Button>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}

export default NavbarView;