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
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>My Profile</Card.Title>
          <Card.Text>
            <ListGroup variant="flush">
              <ListGroupItem>Username:<span style={{ marginLeft: '5px' }} className='text-color'>{username}</span></ListGroupItem>
              <ListGroupItem>Email:<span style={{ marginLeft: '5px' }} className='text-color'>{email}</span></ListGroupItem>
              <ListGroupItem>Birthday:<span style={{ marginLeft: '5px' }} className='text-color'>{birthday}</span></ListGroupItem>
              {/* not working */}
              <ListGroupItem>Favorite Movies:<span style={{ marginLeft: '5px' }} className='text-color'>{movies}</span></ListGroupItem>
            </ListGroup>
          </Card.Text>
          <Button style={{ margin: '3px' }} variant='info' onClick={() => { onBackClick() }}>Back</Button>
          <Button style={{ margin: '3px' }} variant='info' onClick={() => { }}>Update Profile</Button>
          <Button style={{ margin: '3px' }} variant='danger' onClick={() => { this.handleDelete() }}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  }
}

export default ProfileView;