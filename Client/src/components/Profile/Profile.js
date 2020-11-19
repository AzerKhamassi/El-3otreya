import React from 'react';

import {
  Col,
  Row,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
  Container,
} from 'reactstrap';

// core components
import { AppContext } from 'context/AppContext';
import classes from './Profile.module.css';
import axios from '../../axios';
import PasswordModal from './PasswordModal';
import Spinner from 'views/Spinner/Spinner';
const Profile = (props) => {
  const { user, darkMode, token, setUser } = React.useContext(AppContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [editName, setEditName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    if (token) {
      document.body.classList.add('profile-page');
      document.body.classList.add('sidebar-collapse');
      document.documentElement.classList.remove('nav-open');
      window.scrollTo(0, 0);
      axios
        .get('/users/' + props.match.params.userId)
        .then((response) => {
          setUserId(response.data.user._id);
          setUserProfile(response.data.user);
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            props.history.replace('/');
          }
        });
      document.body.scrollTop = 0;
      return function cleanup() {
        document.body.classList.remove('profile-page');
        document.body.classList.remove('sidebar-collapse');
      };
    } else {
      props.history.replace('/login');
    }
  }, [props, token]);

  const updateName = () => {
    axios
      .patch(
        '/users/' + props.match.params.userId,
        [{ propName: 'name', value: name }],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateEmail = () => {
    axios
      .patch(
        '/users/' + props.match.params.userId,
        [{ propName: 'name', value: name }],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className='wrapper'>
        <div style={{ paddingTop: '100px' }}>
          {loading ? (
            <React.Fragment>
              <Spinner />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {' '}
              <Container className={classes.Container}>
                <div className={'photo-container ' + classes.Photo}>
                  <img alt='...' src={require('assets/img/ryan.jpg')}></img>
                  {user._id === userId && (
                    <button className='btn btn-round'>
                      <i className='fa fa-camera'></i>
                    </button>
                  )}
                </div>
                <h3
                  className='title'
                  style={{ color: darkMode ? 'black' : 'white' }}
                >
                  {userProfile?.name}
                </h3>
                <p className='category'>Photographer </p>
                {user._id === userId && (
                  <React.Fragment>
                    <Col style={{ width: '500px' }} className={classes.Col}>
                      {editName ? (
                        <Row className='mx-1'>
                          <Col
                            xs='12'
                            sm='6'
                            md='6'
                            className='pr-0 pt-2'
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <InputGroup
                              className={
                                'no-border input-lg' +
                                (firstFocus ? ' input-group-focus' : '')
                              }
                            >
                              <InputGroupAddon addonType='prepend'>
                                <InputGroupText
                                  style={{
                                    color: darkMode ? 'black' : 'white',
                                  }}
                                >
                                  <i className='now-ui-icons users_circle-08'></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder='Name'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={() => setFirstFocus(true)}
                                style={{ color: darkMode ? 'black' : 'white' }}
                                onBlur={() => setFirstFocus(false)}
                              ></Input>
                            </InputGroup>
                          </Col>
                          <Col
                            xs='12'
                            sm='6'
                            md='6'
                            className='p-0'
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <Button
                              className='btn-round'
                              color='success'
                              onClick={updateName}
                            >
                              <i className='now now-ui-icons ui-1_check'></i>
                            </Button>
                            <Button
                              className='btn-round'
                              color='danger'
                              onClick={() => {
                                setEditName(false);
                                setName(user.name);
                              }}
                            >
                              <i className='now now-ui-icons ui-1_simple-remove'></i>
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        <Row className={classes.Row}>
                          <Col
                            className='pt-2'
                            xs='10'
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <h6 style={{ color: darkMode ? 'black' : 'white' }}>
                              Name: {user.name}
                            </h6>
                          </Col>
                          <Col xs='2'>
                            <Button
                              className='btn-round'
                              color='info'
                              onClick={() => setEditName(true)}
                            >
                              <i className='fa fa-edit '></i>
                            </Button>
                          </Col>
                        </Row>
                      )}
                      <hr className='m-1' style={{ backgroundColor: 'gray' }} />
                      {editEmail ? (
                        <Row className='mx-1'>
                          <Col
                            xs='12'
                            sm='6'
                            md='6'
                            className='pr-0 pt-2'
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <InputGroup
                              className={
                                'no-border input-lg' +
                                (firstFocus ? ' input-group-focus' : '')
                              }
                            >
                              <InputGroupAddon addonType='prepend'>
                                <InputGroupText
                                  style={{
                                    color: darkMode ? 'black' : 'white',
                                  }}
                                >
                                  <i className='now-ui-icons business_globe'></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder='Nom'
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFirstFocus(true)}
                                style={{ color: darkMode ? 'black' : 'white' }}
                                onBlur={() => setFirstFocus(false)}
                              ></Input>
                            </InputGroup>
                          </Col>
                          <Col
                            xs='12'
                            sm='6'
                            md='6'
                            className='p-0'
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <Button
                              className='btn-round'
                              color='success'
                              onClick={updateEmail}
                            >
                              <i className='now now-ui-icons ui-1_check'></i>
                            </Button>
                            <Button
                              className='btn-round'
                              color='danger'
                              onClick={() => {
                                setEditEmail(false);
                                setEmail(user.email);
                              }}
                            >
                              <i className='now now-ui-icons ui-1_simple-remove'></i>
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        <Row className={classes.Row}>
                          <Col
                            className='pt-2'
                            xs='10'
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <h6 style={{ color: darkMode ? 'black' : 'white' }}>
                              Email: {user.email}
                            </h6>
                          </Col>
                          <Col xs='2'>
                            <Button
                              className='btn-round'
                              color='info'
                              onClick={() => setEditEmail(true)}
                            >
                              <i className='fa fa-edit '></i>
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Col>
                    <Button
                      color='info'
                      className='btn-round'
                      onClick={() => setModal(true)}
                    >
                      Mdofier mot de passe
                    </Button>
                  </React.Fragment>
                )}

                <PasswordModal modal={modal} setModal={setModal} />
                <div
                  className='content'
                  style={{ color: darkMode ? 'black' : 'white' }}
                >
                  <div className='social-description'>
                    <h2>26</h2>
                    <p>Comments</p>
                  </div>
                  <div className='social-description'>
                    <h2>26</h2>
                    <p>Comments</p>
                  </div>
                  <div className='social-description'>
                    <h2>48</h2>
                    <p>Bookmarks</p>
                  </div>
                </div>
              </Container>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
