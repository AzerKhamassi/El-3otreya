import { AppContext } from 'context/AppContext';
import React from 'react';
import { Card, CardBody } from 'reactstrap';
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
        <CardBody className='text-center p-0'>
          <div className={classes.Photo}>
            <div className={classes.Image}></div>
            {/* <img
              alt='...'
              src={require('assets/img/pepsi.jpg')}
              className='img-fluid'
              // style={{ height: '350px', width: '100%' }}
            /> */}
            {props.product.user._id !== user._id && (
              <i
                onClick={props.clicked}
                className={'fa fa-shopping-cart fa-5x ' + classes.BasketBtn}
              ></i>
            )}
          </div>
          <div
            className='my-2 px-2'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <h6 className='m-0' style={{ color: darkMode ? 'black' : 'white' }}>
              {props.product.name}
            </h6>
            <h6 className='m-0' style={{ color: darkMode ? 'black' : 'white' }}>
              ({props.product.price} TND)
            </h6>
          </div>
        </CardBody>
        {/* <CardFooter className='text-center px-1 '>
          {props.product.user._id !== user._id && (
            <Button
              onClick={props.clicked}
              block
              className='btn-round text-uppercase'
              style={{ backgroundColor: ' rgba(145, 145, 145, 0.879)' }}
            >
              <i className='fa fa-shopping-cart fa-2x'></i>
            </Button>
          )}
        </CardFooter> */}
      </Card>
    </React.Fragment>
  );
};

export default Product;
