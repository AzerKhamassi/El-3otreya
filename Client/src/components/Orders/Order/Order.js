import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { AppContext } from 'context/AppContext';

const Order = (props) => {
  const { darkMode } = React.useContext(AppContext);

  React.useEffect(() => {}, []);
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
          </div>
          <ModalBody className='mt-3'>
            <h5
              className='text-center'
              style={{ color: darkMode ? 'black' : 'white' }}
            >
              Order {props.order?._id}
            </h5>
            <ul className='list-group'>
              {props.order?.items?.map((item) => (
                <li
                  className='list-group-item list-group-item-dark text-center'
                  style={{
                    backgroundColor: darkMode ? 'white' : '#1c1e21',
                    color: darkMode ? 'black' : 'white',
                  }}
                  key={item._id}
                >
                  {item?.product?.name} {item?.product?.price} TND
                </li>
              ))}
            </ul>
          </ModalBody>
          <div className='modal-footer'></div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Order;
