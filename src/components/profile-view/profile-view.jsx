import React from 'react';
import { NavbarView } from '../navbar-view/navbar-view';
// Bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

export class ProfileView extends React.Component {

  render() {
    const { username, email, birthday, movies, onBackClick } = this.props;

    return <div style={{ marginTop: '70px', }}>
      <div>
        <NavbarView />
      </div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Card.Text>
            <ListGroup variant="flush">
              <ListGroupItem>Username:<span className='text-color'>{username}</span></ListGroupItem>
              <ListGroupItem>Email:<span className='text-color'>{email}</span></ListGroupItem>
              <ListGroupItem>Birthday:<span className='text-color'>{birthday}</span></ListGroupItem>
              <ListGroupItem>Favorite Movies:<span className='text-color'>{movies}</span></ListGroupItem>
            </ListGroup>
          </Card.Text>
          <Button variant='info' onClick={() => { onBackClick() }}>Back</Button>
          <Button variant='info' onClick={() => { }}>Update Profile</Button>
          <Button variant='danger' onClick={() => { this.handleDelete() }}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  }
}

export default ProfileView;