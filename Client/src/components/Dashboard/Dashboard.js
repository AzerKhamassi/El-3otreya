import { AppContext } from 'context/AppContext';
import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import AdminProducts from './Products/AdminProducts';
import classes from './Dashboard.module.css';
import Home from './Home/Home';

const Dashboard = (props) => {
  const { token, darkMode } = React.useContext(AppContext);
  React.useEffect(() => {
    if (token) {
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
  return (
    <React.Fragment>
      <div className={classes.Dashboard}>
        <div className={classes.Container}>
          <NavLink
            className={classes.Item}
            to='/admin'
            exact
            activeClassName={classes.ActiveLink}
            style={{ color: darkMode ? 'black' : 'white' }}
          >
            <i className='fa fa-home fa-2x mx-1'></i>
            <p className='text-center m-0'>Home</p>
          </NavLink>
          <NavLink
            className={classes.Item}
            to='/admin/products'
            activeClassName={classes.ActiveLink}
            style={{ color: darkMode ? 'black' : 'white' }}
          >
            <i className='fa fa-list-ul fa-2x mx-1'></i>
            <p className='text-center m-0'>Products</p>
          </NavLink>
        </div>
      </div>
      <Switch>
        <Route exact path={`${props.match.path}/`} component={Home} />
        <Route
          exact
          path={`${props.match.path}/products`}
          component={AdminProducts}
        />
      </Switch>
    </React.Fragment>
  );
};

export default Dashboard;
