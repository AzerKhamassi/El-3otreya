import React, { createContext, useState } from 'react';
import axios from '../axios';
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [purchasedProducts, setPurchasedProducts] = useState(
    JSON.parse(localStorage.getItem('products'))
      ? JSON.parse(localStorage.getItem('products'))
      : []
  );
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'false'
  );

  React.useEffect(() => {});
  React.useEffect(() => {
    let itemsCount = 0;
    let totalPrice = 0;
    purchasedProducts.forEach((product) => {
      totalPrice += product.price * product.quantity;
      itemsCount += product.quantity;
      localStorage.setItem('products', JSON.stringify(purchasedProducts));
      localStorage.setItem('totalPrice', totalPrice);
      localStorage.setItem('itemsCount', itemsCount);
    });
    setItemsCount(itemsCount);
    setTotalPrice(totalPrice);
  }, [purchasedProducts, token]);

  React.useEffect(() => {
    if (token) {
      axios
        .get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((respoonse) => {
          setUser(respoonse.data.user);
        });
    }
  }, [token]);
  React.useEffect(() => {
    if (!darkMode) {
      document.getElementById('root').style.backgroundColor = 'rgb(28, 30, 33)';
    } else {
      document.getElementById('root').style.backgroundColor = 'white';
    }
  }, [darkMode]);
  const addProduct = (product) => {
    const productIndex = purchasedProducts.findIndex(
      (p) => p._id === product._id
    );
    if (productIndex < 0) {
      setPurchasedProducts([...purchasedProducts, product]);
    } else {
      purchasedProducts[productIndex].quantity += product.quantity;
    }
    setItemsCount((prevItemsCount) => {
      localStorage.setItem('itemsCount', prevItemsCount + product.quantity);
      return prevItemsCount + product.quantity;
    });
    setTotalPrice((prevtotalPrice) => {
      localStorage.setItem(
        'totalPrice',
        prevtotalPrice + product.quantity * product.price
      );
      return prevtotalPrice + product.quantity * product.price;
    });
    localStorage.setItem('products', JSON.stringify(purchasedProducts));
  };
  const deleteProduct = (product) => {
    const updatedProducts = purchasedProducts;
    const productIndex = purchasedProducts.findIndex(
      (p) => p._id === product._id
    );
    updatedProducts.splice(productIndex, 1);
    setPurchasedProducts(updatedProducts);
    setItemsCount((prevItemsCount) => {
      localStorage.setItem('itemsCount', prevItemsCount - product.quantity);
      return prevItemsCount - product.quantity;
    });
    setTotalPrice((prevtotalPrice) => {
      localStorage.setItem(
        'totalPrice',
        prevtotalPrice - product.quantity * product.price
      );
      return prevtotalPrice - product.quantity * product.price;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const loginUser = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const logoutUser = () => {
    setUser({});
    setToken('');
    setTotalPrice(0);
    setItemsCount(0);
    setPurchasedProducts([]);
    localStorage.removeItem('token');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('itemsCount');
    localStorage.removeItem('products');
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    localStorage.setItem('darkMode', darkMode);
  };

  return (
    <AppContext.Provider
      value={{
        purchasedProducts,
        setPurchasedProducts,
        token,
        user,
        addProduct,
        itemsCount,
        setItemsCount,
        loginUser,
        totalPrice,
        logoutUser,
        deleteProduct,
        darkMode,
        toggleDarkMode,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
