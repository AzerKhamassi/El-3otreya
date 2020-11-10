import { AppContext } from 'context/AppContext';
import React from 'react';
import { Button, Card, CardBody, CardFooter } from 'reactstrap';
import classes from './Product.module.css';
const Product = (props) => {
  const { user, darkMode } = React.useContext(AppContext);
  return (
    <React.Fragment>
      <Card
        className={classes.Card}
        style={{ backgroundColor: darkMode ? 'white' : 'black' }}
      >
        {/* <CardHeader className='text-center text-uppercase'></CardHeader> */}
        <CardBody className='text-center py-3'>
          <img
            className='img-fluid img-raised rounded-circle'
            alt='...'
            // style={{ borderRadius: '50%' }}
            src='https://img-0.journaldunet.com/6Vrvxcv3SwHHCnUtaBzMQMYor1I=/1280x/smart/32d90de13a5f411c86709152f70fc67c/ccmcms-jdn/10861192.jpg'
          />
          <h6 className='mt-5' style={{ color: darkMode ? 'black' : 'white' }}>
            {props.product.name} ({props.product.price} TND)
          </h6>
        </CardBody>
        <CardFooter className='text-center px-1 '>
          {props.product.user._id !== user._id ? (
            <Button
              onClick={props.clicked}
              block
              className='btn-round text-uppercase'
              // color='info'
              style={{ backgroundColor: ' rgba(145, 145, 145, 0.879)' }}
            >
              <i className='now-ui-icons shopping_cart-simple'></i> Chariot
            </Button>
          ) : (
            <React.Fragment>
              <Button
                className='btn-round'
                color='info'
                size='sm'
                onClick={props.editProduct}
              >
                Modifier
              </Button>
              <Button
                className='btn-round'
                color='danger'
                size='sm'
                onClick={props.deleteProduct}
              >
                Supprimer
              </Button>
            </React.Fragment>
          )}
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

export default Product;