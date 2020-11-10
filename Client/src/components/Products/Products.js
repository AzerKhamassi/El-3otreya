import React, { useState, useContext } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  ModalBody,
  Label,
} from 'reactstrap';
import axios from '../../axios';
import Product from './Product/Product';
import classes from './Products.module.css';
import NewProduct from './NewProduct/NewProduct';
import { AppContext } from 'context/AppContext';
import Spinner from 'views/Spinner/Spinner';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [firstFocus, setFirstFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addProduct, token, darkMode } = useContext(AppContext);

  React.useEffect(() => {
    if (token) {
      axios
        .get('/products')
        .then((response) => {
          setProducts(response.data.products);
          setLoading(false);
        })
        .catch((error) => console.log(error));
      document.body.classList.add('sidebar-collapse');
      document.documentElement.classList.remove('nav-open');
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      return function cleanup() {
        document.body.classList.remove('sidebar-collapse');
      };
    } else {
      props.history.replace('/login');
    }
  }, [token, props]);

  const deleteProductHandler = (product) => {
    const originalProdcuts = [...products];
    const updatedProducts = [...products];
    const productIndex = products.findIndex((p) => p._id === product._id);
    updatedProducts.splice(productIndex, 1);
    const token = localStorage.getItem('token');
    axios
      .delete('/products/' + product._id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProducts(updatedProducts);
      })
      .catch((error) => {
        setProducts(originalProdcuts);
      });
  };
  const openPurchaseProductModal = (product) => {
    setModal1(true);
    setSelectedProduct(product);
  };

  const purchaseProductHandler = () => {
    addProduct({ ...selectedProduct, quantity: quantity });
  };

  const cancelPurchaseProduct = () => {
    setModal1(false);
    setQuantity(1);
  };
  const editProduct = (product) => {
    props.history.push('/products/' + product._id);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.Container}>
          <div className='text-center'>
            <Button
              color='success'
              className='btn-round'
              onClick={() => setModal(true)}
            >
              Ajouter Produit
            </Button>
            <NewProduct modal={modal} setModal={setModal} />
          </div>
          <Row className={classes.Row}>
            {products.map((product) => (
              <Col
                key={product._id}
                xs='12'
                sm='6'
                md='4'
                lg='4'
                xl='3'
                style={{ margin: '20px 0' }}
              >
                <Product
                  product={product}
                  clicked={() => openPurchaseProductModal(product)}
                  editProduct={() => editProduct(product)}
                  deleteProduct={() => deleteProductHandler(product)}
                />
              </Col>
            ))}
          </Row>
          <Modal
            isOpen={modal1}
            toggle={cancelPurchaseProduct}
            style={{
              boxShadow:
                'inset rgba(0, 0, 0, 0.1) 0px 2px 0px, inset rgba(0, 0, 0, 0.04) 0px 0px 0px 2px, rgba(255, 255, 255, 0.25) 0px 2px 10px',
            }}
          >
            <div
              style={{
                backgroundColor: darkMode ? 'white' : 'black',
              }}
            >
              <div className='modal-header flex-column align-items-center'>
                <button
                  className='close'
                  type='button'
                  onClick={cancelPurchaseProduct}
                  style={{ color: darkMode ? 'black' : 'white' }}
                >
                  <i className='now-ui-icons ui-1_simple-remove'></i>
                </button>
                <div>
                  <h5
                    className='title title-up'
                    style={{ color: darkMode ? 'black' : 'white' }}
                  >
                    Produit {selectedProduct.name}
                  </h5>
                </div>
                <div className='text-center'>
                  <h5
                    className='title title-up p-1'
                    style={{ color: darkMode ? 'black' : 'white' }}
                  >
                    Prix {selectedProduct.price}
                  </h5>
                </div>
              </div>
              <ModalBody>
                <Label
                  className='ml-2'
                  style={{ color: darkMode ? 'black' : 'white' }}
                >
                  Quantité
                </Label>
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
                      <i className='now-ui-icons shopping_basket'></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Quantité'
                    type='number'
                    step='1'
                    min='1'
                    value={quantity}
                    style={{ color: darkMode ? 'black' : 'white' }}
                    onChange={(e) => setQuantity(+e.target.value)}
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
              </ModalBody>
              <div className='modal-footer'>
                <Button
                  color='success'
                  type='button'
                  onClick={purchaseProductHandler}
                >
                  Confirmer
                </Button>
                <Button
                  color='danger'
                  type='button'
                  onClick={cancelPurchaseProduct}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </React.Fragment>
  );
};

export default Products;
