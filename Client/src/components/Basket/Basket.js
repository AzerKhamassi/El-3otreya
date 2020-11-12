import { AppContext } from 'context/AppContext';
import React, { useContext, useState } from 'react';
import { Col, Table, Button } from 'reactstrap';
import classes from './Basket.module.css';
import axios from '../../axios';
const Basket = (props) => {
  const {
    purchasedProducts,
    setPurchasedProducts,
    totalPrice,
    darkMode,
    setItemsCount,
    deleteProduct,
    token,
  } = useContext(AppContext);
  const [products, setProducts] = useState(purchasedProducts);

  React.useEffect(() => {
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove('sidebar-collapse');
    };
  }, []);

  const addProductQuantity = (product) => {
    const productIndex = products.findIndex((p) => p._id === product._id);
    let updatedProducts = [...products];
    updatedProducts[productIndex].quantity = product.quantity + 1;
    setItemsCount((prevItemsCount) => {
      return prevItemsCount + 1;
    });

    setPurchasedProducts(updatedProducts);
    setProducts(updatedProducts);
  };

  const substractProductQuantity = (product) => {
    const productIndex = products.findIndex((p) => p._id === product._id);
    let updatedProducts = [...products];
    updatedProducts[productIndex].quantity = product.quantity - 1;
    setItemsCount((prevItemsCount) => prevItemsCount - 1);
    if (updatedProducts[productIndex].quantity === 0) {
      updatedProducts.splice(productIndex, 1);
    }
    setPurchasedProducts(updatedProducts);
    setProducts(updatedProducts);
  };

  const submitOrderHandler = () => {
    console.log('order');
    axios
      .post(
        '/orders/',
        {
          products: products,
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
  };

  return (
    <div className={classes.Container}>
      {products.length ? (
        <React.Fragment>
          <Col xs='12' md='6'>
            <Table
              className='m-0 p-0'
              responsive
              style={{ color: darkMode ? 'black' : 'white' }}
            >
              <thead>
                <tr>
                  <th>Produit</th>
                  <th className='text-center'>Prix</th>
                  <th className='text-center'>Quantité</th>
                  <th className='text-center'>Retirer</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <p style={{ fontWeight: 'bold' }}>{product.name}</p>
                    </td>
                    <td className='text-center'>
                      <p style={{ fontWeight: 'bold' }}>{product.price}</p>
                    </td>
                    <td className='text-center'>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <span>
                          <i
                            style={{ cursor: 'pointer' }}
                            onClick={() => substractProductQuantity(product)}
                            className='fa fa-angle-left fa-2x'
                          ></i>
                        </span>
                        <span style={{ fontWeight: 'bold', margin: '0 8px' }}>
                          {product.quantity}
                        </span>
                        <span>
                          <i
                            style={{ cursor: 'pointer' }}
                            onClick={() => addProductQuantity(product)}
                            className='fa fa-angle-right fa-2x'
                          ></i>
                        </span>
                      </div>
                    </td>
                    <td className='text-center'>
                      <i
                        style={{ cursor: 'pointer' }}
                        className='fa fa-times fa-2x'
                        onClick={() => deleteProduct(product)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <hr />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0',
                padding: '0',
              }}
            >
              <div>
                <h3
                  className='m-0'
                  style={{ color: darkMode ? 'black' : 'white' }}
                >
                  Prix Total {totalPrice.toPrecision(3)} TND
                </h3>
              </div>
              <div>
                <Button color='success' onClick={submitOrderHandler}>
                  Commander
                </Button>
              </div>
            </div>
          </Col>
        </React.Fragment>
      ) : (
        <Col md='6' className='text-center'>
          <div className={classes.Basket}>
            <h3
              className='pt-2'
              style={{ color: darkMode ? 'color' : 'white' }}
            >
              Votre chariot est vide
            </h3>
          </div>
        </Col>
      )}
    </div>
  );
};

export default Basket;
