import React from 'react';
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  ModalBody,
  Button,
  Row,
} from 'reactstrap';
import { AppContext } from 'context/AppContext';
import axios from '../../axios';

const PasswordModal = (props) => {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [repassword, setRePassword] = React.useState('');
  const [newPassword, setNewtPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const { darkMode, token } = React.useContext(AppContext);
  const submitHandler = () => {
    if (newPassword.trim() !== repassword.trim()) {
      setError(true);
    } else {
      setError(false);
      axios
        .patch(
          '/users/editpassword',
          {
            password: password,
            newPassword: newPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(password, repassword, newPassword);
  };

  const closeModal = () => {
    props.setModal(false);
    setError(false);
    setNewtPassword('');
    setPassword('');
    setRePassword('');
  };
  return (
    <React.Fragment>
      <Modal isOpen={props.modal} toggle={() => closeModal()}>
        <div style={{ backgroundColor: darkMode ? 'white' : 'black' }}>
          <div className='modal-header justify-content-center'>
            <button
              className='close'
              type='button'
              style={{ color: darkMode ? 'black' : 'white' }}
              onClick={() => closeModal()}
            >
              <i className='now-ui-icons ui-1_simple-remove'></i>
            </button>
          </div>
          <ModalBody className='mt-3'>
            <InputGroup
              className={
                'no-border input-lg' + (firstFocus ? ' input-group-focus' : '')
              }
            >
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <i className='now-ui-icons objects_key-25'></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder='Tapez votre mot de passe'
                type='password'
                onFocus={() => setFirstFocus(true)}
                onBlur={() => setFirstFocus(false)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </InputGroup>
            <InputGroup
              className={
                'no-border input-lg' + (firstFocus ? ' input-group-focus' : '')
              }
            >
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <i className='now-ui-icons objects_key-25'></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder='Ratapez votre mot de passe'
                type='password'
                value={repassword}
                min='0'
                onChange={(e) => setRePassword(e.target.value)}
                onFocus={() => setFirstFocus(true)}
                onBlur={() => setFirstFocus(false)}
              ></Input>
            </InputGroup>
            <InputGroup
              className={
                'no-border input-lg' + (firstFocus ? ' input-group-focus' : '')
              }
            >
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <i className='now-ui-icons objects_key-25'></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder='Tapez votre nouveau mot de passe'
                type='password'
                value={newPassword}
                min='0'
                onChange={(e) => setNewtPassword(e.target.value)}
                onFocus={() => setFirstFocus(true)}
                onBlur={() => setFirstFocus(false)}
              ></Input>
            </InputGroup>

            {error && (
              <Row className='alert alert-danger m-0'>
                <h3 className='m-0 p-0'>Les mots de passes !</h3>
              </Row>
            )}
          </ModalBody>
          <div className='modal-footer'>
            <Button color='success' type='button' onClick={submitHandler}>
              Confirmer
            </Button>
            <Button
              color='danger'
              type='button'
              onClick={() => props.setModal(false)}
            >
              Fermer
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default PasswordModal;
