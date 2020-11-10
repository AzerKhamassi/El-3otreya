import { AppContext } from 'context/AppContext';
import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap';
import axios from '../../axios';

// core components

const LoginPage = (props) => {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { loginUser } = React.useContext(AppContext);

  React.useEffect(() => {
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('sidebar-collapse');
    };
  }, []);
  const loginHandler = () => {
    axios
      .post('/users/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        loginUser(response.data.user, response.data.token);
        props.history.replace('/');
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(email, password);
  };
  return (
    <>
      <div className='page-header clear-filter'>
        <div className='content'>
          <Container>
            <Col
              className='ml-auto mr-auto'
              md='5'
              style={{
                border: '4px solid gray',
                borderRadius: '6px',
                padding: '10px',
              }}
            >
              <Card className='card-login card-plain'>
                <Form className='form'>
                  <CardHeader className='text-center'>
                    <div className='logo-container'>
                      <h3 className='text-black'>El 3oTreya</h3>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (firstFocus ? ' input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='now-ui-icons users_circle-08'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='Email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (lastFocus ? ' input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='now-ui-icons objects_key-25'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className='text-center'>
                    <Button
                      block
                      className='btn-round'
                      color='info'
                      // href='#pablo'
                      onClick={loginHandler}
                      // onClick={(e) => e.preventDefault()}
                      size='lg'
                    >
                      Connexion
                    </Button>
                    <hr />
                    <Button
                      className='btn-round'
                      color='success'
                      // href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      size='sm'
                    >
                      Créer Un Compte
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        {/* <TransparentFooter /> */}
      </div>
    </>
  );
};

export default LoginPage;
