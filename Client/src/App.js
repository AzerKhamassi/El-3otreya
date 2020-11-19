import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Index from 'views/Index.js';
import NucleoIcons from 'views/NucleoIcons.js';
import Login from './components/Login/Login';
import LandingPage from 'views/examples/LandingPage.js';
import Profile from 'components/Profile/Profile';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import Register from './components/Register/Register';
import Products from 'components/Products/Products';
import Basket from 'components/Basket/Basket';
import ProductDetails from 'components/Products/ProductDetails/ProductDetails';
import AppContextProvider from 'context/AppContext';
import Logout from 'components/Logout/Logout';
import Orders from 'components/Orders/Orders';
import Dashboard from 'components/Dashboard/Dashboard';

const App = (props) => {
  return (
    <React.Fragment>
      <AppContextProvider>
        <IndexNavbar />
        <Switch>
          <Route
            path='/products/:productId'
            render={(props) => <ProductDetails {...props} />}
          />

          <Route path='/products' render={(props) => <Products {...props} />} />
          <Route path='/basket' render={(props) => <Basket {...props} />} />
          <Route path='/orders' render={(props) => <Orders {...props} />} />

          <Route
            path='/nucleo-icons'
            render={(props) => <NucleoIcons {...props} />}
          />
          <Route
            path='/landing-page'
            render={(props) => <LandingPage {...props} />}
          />
          <Route
            path='/profile/:userId'
            render={(props) => <Profile {...props} />}
          />
          <Route path='/login' render={(props) => <Login {...props} />} />
          <Route path='/logout' render={(props) => <Logout {...props} />} />
          <Route path='/register' render={(props) => <Register {...props} />} />
          <Route path='/index' render={(props) => <Index {...props} />} />
          <Route path='/admin' render={(props) => <Dashboard {...props} />} />

          <Redirect from='/' to='/products' />
          <Redirect to='/' />
          {/* <Redirect from='/' to='/index' /> */}
        </Switch>
      </AppContextProvider>
    </React.Fragment>
  );
};

export default App;
