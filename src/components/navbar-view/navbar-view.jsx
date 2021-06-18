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
      <Container>
        <Navbar bg='light' expand='lg' fixed='top'>
          <Navbar.Brand href=''>All My Movies</Navbar.Brand>
          <Navbar.Toggle area-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav activeKey='/' >
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/users/${user}'>Profile</Nav.Link>
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

// Idea to bring up logged in user in Navbar:
// 
  // componentDidMount() {
  //   let accessToken = localStorage.getItem('token');
  //   if (accessToken !== null) {
  //     this.setState({
  //       user: localStorage.getItem('user')
  //     })
  //   }
  // }

  // const user = this.state;
  // <Navbar.Text>Signed in as: <a href='#login'>{user => this.onLoggedIn(user)}</a></Navbar.Text>

  // taken from Nav tag: onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}