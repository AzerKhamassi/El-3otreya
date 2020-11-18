import React from 'react';
import axios from '../../../axios';
import classes from './ProductDetails.module.css';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
} from 'reactstrap';
import { AppContext } from 'context/AppContext';
import Skeleton from 'react-loading-skeleton';

const ProductDetails = (props) => {
  const [product, setProduct] = React.useState({});
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [editProductName, setEditProductName] = React.useState(false);
  const [productName, setProductName] = React.useState('');
  const [editProductPrice, setEditProductPrice] = React.useState(false);
  const [productPrice, setProductPrice] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const { token, darkMode } = React.useContext(AppContext);

  React.useEffect(() => {
    if (token) {
      axios
        .get('/products/' + props.match.params.productId)
        .then((response) => {
          setProduct(response.data.product);
          setProductName(response.data.product.name);
          setProductPrice(response.data.product.price);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.history.replace('/login');
    }
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('sidebar-collapse');
    };
  }, [token, props]);

  const updateProductName = () => {
    axios
      .patch(
        '/products/' + product._id,

        [{ propName: 'name', value: productName }],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // swal('An Error Occured try again', '', 'error');
      });
  };
  const updateProductPrice = () => {
    axios
      .patch(
        '/products/' + product._id,

        [{ propName: 'price', value: productPrice }],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // swal('An Error Occured try again', '', 'error');
      });
  };
  return (
    <div style={{ paddingTop: '110px' }}>
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col xs='11' sm='8' md='5' xl='4'>
          <Card
            className={classes.Card}
            style={{ backgroundColor: darkMode ? 'white' : 'black' }}
          >
            <CardHeader className='text-center text-uppercase'></CardHeader>
            <CardBody className='text-center py-3'>
              <img
                className='img-fluid img-raised'
                style={{ borderRadius: '50%', marginBottom: '15px' }}
                alt='...'
                src='https://img-0.journaldunet.com/6Vrvxcv3SwHHCnUtaBzMQMYor1I=/1280x/smart/32d90de13a5f411c86709152f70fc67c/ccmcms-jdn/10861192.jpg'
              />
              {editProductName ? (
                <Row className={classes.Row}>
                  <Col xs='6' className='pr-0 pt-2'>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (firstFocus ? ' input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText
                          style={{ color: darkMode ? 'black' : 'white' }}
                        >
                          <i className='now-ui-icons users_circle-08'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='Nom du produit'
                        type='text'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        style={{ color: darkMode ? 'black' : 'white' }}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                  </Col>
                  <Col xs='6' className='p-0'>
                    <Button
                      className='btn-round'
                      color='success'
                      onClick={updateProductName}
                    >
                      <i className='now now-ui-icons ui-1_check'></i>
                    </Button>
                    <Button
                      className='btn-round'
                      color='danger'
                      onClick={() => {
                        setEditProductName(false);
                        setProductName(product.name);
                      }}
                    >
                      <i className='now now-ui-icons ui-1_simple-remove'></i>
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Row className={classes.Row}>
                  <Col className='pt-2' xs='6'>
                    {loading ? (
                      <Skeleton height={20} width={100} />
                    ) : (
                      <h6 style={{ color: darkMode ? 'black' : 'white' }}>
                        Product: {product.name}
                      </h6>
                    )}
                  </Col>
                  <Col xs='6'>
                    <Button
                      className='btn-round'
                      color='info'
                      onClick={() => setEditProductName(true)}
                    >
                      <i className='fa fa-edit '></i>
                    </Button>
                  </Col>
                </Row>
              )}

              {editProductPrice ? (
                <Row className={classes.Row}>
                  <Col xs='6' className='pr-0 pt-2'>
                    <InputGroup
                      className={
                        'no-border input-lg' +
                        (firstFocus ? ' input-group-focus' : '')
                      }
                    >
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText
                          style={{ color: darkMode ? 'black' : 'white' }}
                        >
                          <i className='now-ui-icons users_circle-08'></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='Prix'
                        type='number'
                        step='0.1'
                        style={{ color: darkMode ? 'black' : 'white' }}
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                  </Col>
                  <Col xs='6' className='p-0'>
                    <Button
                      className='btn-round'
                      color='success'
                      onClick={updateProductPrice}
                    >
                      <i className='now now-ui-icons ui-1_check'></i>
                    </Button>
                    <Button
                      className='btn-round'
                      color='danger'
                      onClick={() => {
                        setEditProductPrice(false);
                        setProductPrice(product.price);
                      }}
                    >
                      <i className='now now-ui-icons ui-1_simple-remove'></i>
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Row className={classes.Row}>
                  <Col className='pt-2' xs='6'>
                    {loading ? (
                      <Skeleton height={20} width={100} />
                    ) : (
                      <h6 style={{ color: darkMode ? 'black' : 'white' }}>
                        Price: {product.price}
                      </h6>
                    )}
                  </Col>
                  <Col xs='6'>
                    <Button
                      className='btn-round'
                      color='info'
                      onClick={() => setEditProductPrice(true)}
                    >
                      <i className='fa fa-edit '></i>
                    </Button>
                  </Col>
                </Row>
              )}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
