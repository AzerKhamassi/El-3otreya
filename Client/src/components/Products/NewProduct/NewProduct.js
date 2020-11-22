import React from 'react';
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  ModalBody,
  Button,
} from 'reactstrap';
import axios from '../../../axios';
import { withRouter } from 'react-router-dom';
import { AppContext } from 'context/AppContext';
const NewProduct = (props) => {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const { darkMode } = React.useContext(AppContext);
  const addProductHandler = () => {
    const token = localStorage.getItem('token');

    axios
      .post(
        '/products',
        {
          name: name,
          price: price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setName('');
        setPrice('');
        props.productAdded(true);
        // props.history.push('/admin/products');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <Modal
        isOpen={props.modal}
        toggle={() => props.setModal(false)}
        style={{
          boxShadow:
            'inset rgba(0, 0, 0, 0.1) 0px 2px 0px, inset rgba(0, 0, 0, 0.04) 0px 0px 0px 2px, rgba(255, 255, 255, 0.25) 0px 2px 10px',
        }}
      >
        <div style={{ backgroundColor: darkMode ? 'white' : 'black' }}>
          <div className='modal-header justify-content-center'>
            <button
              className='close'
              type='button'
              style={{ color: darkMode ? 'black' : 'white' }}
              onClick={() => props.setModal(false)}
            >
              <i className='now-ui-icons ui-1_simple-remove'></i>
            </button>
            <h5
              className='title title-up'
              style={{ color: darkMode ? 'black' : 'white' }}
            >
              Product Info
            </h5>
          </div>
          <ModalBody>
            <InputGroup
              className={
                'no-border input-lg' + (firstFocus ? ' input-group-focus' : '')
              }
            >
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <i className='now-ui-icons shopping_tag-content'></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder='Name'
                type='text'
                onFocus={() => setFirstFocus(true)}
                onBlur={() => setFirstFocus(false)}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
            </InputGroup>
            <InputGroup
              className={
                'no-border input-lg' + (firstFocus ? ' input-group-focus' : '')
              }
            >
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <i className='now-ui-icons business_money-coins'></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder='Price'
                type='number'
                step='0.1'
                value={price}
                min='0'
                onChange={(e) => setPrice(e.target.value)}
                onFocus={() => setFirstFocus(true)}
                onBlur={() => setFirstFocus(false)}
              ></Input>
            </InputGroup>
          </ModalBody>
          <div className='modal-footer'>
            <Button color='success' type='button' onClick={addProductHandler}>
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

export default withRouter(NewProduct);
