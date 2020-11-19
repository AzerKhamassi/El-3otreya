import React from 'react';
import axios from '../../axios';
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
import classes from './Register.module.css';
import { AppContext } from 'context/AppContext';
// core components

const Register = (props) => {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [currentValue, setCurrentValue] = React.useState('Customer');
  const { darkMode } = React.useContext(AppContext);
  React.useEffect(() => {
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('sidebar-collapse');
    };
  }, []);

  const submitHandler = () => {
    let isAdmin = currentValue === 'Seller';
    axios
      .post('/users/signup', {
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin,
      })
      .then((response) => {
        console.log(response);
        props.history.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={classes.Container}>
        <Container>
          <Col className={classes.Register} md='6' xl='5'>
            <Card className='card-login card-plain'>
              <Form className='form'>
                <CardHeader className='text-center'>
                  <div className='logo-container'>
                    <h3 style={{ color: darkMode ? 'black' : 'white' }}>
                      El 3oTreya
                    </h3>
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
                      <InputGroupText style={{ color: 'black' }}>
                        <i className='now-ui-icons users_circle-08'></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Name'
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      'no-border input-lg' +
                      (firstFocus ? ' input-group-focus' : '')
                    }
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText style={{ color: 'black' }}>
                        <i className='now-ui-icons objects_globe'></i>
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
                      (firstFocus ? ' input-group-focus' : '')
                    }
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText style={{ color: 'black' }}>
                        <i className='now-ui-icons objects_key-25'></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Password'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>

                  <InputGroup
                    className={
                      'no-border input-lg' +
                      (firstFocus ? ' input-group-focus' : '')
                    }
                  >
                    <Input
                      type='select'
                      name='select'
                      id='exampleSelect'
                      onChange={(e) => setCurrentValue(e.target.value)}
                    >
                      <option disabled>Select Role</option>
                      <option value='Customer'>Customer</option>
                      <option value='Seller'>Seller</option>
                    </Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className='text-center'>
                  <Button
                    block
                    className='btn-round'
                    color='info'
                    onClick={submitHandler}
                    size='lg'
                  >
                    S’inscrire
                  </Button>
                  <hr />
                  <Button
                    className='btn-round'
                    color='success'
                    onClick={(e) => props.history.push('/login')}
                    size='sm'
                  >
                    Se Connecter
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Register;
