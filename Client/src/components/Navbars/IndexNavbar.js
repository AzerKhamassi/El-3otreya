import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from 'reactstrap';

import { AppContext } from 'context/AppContext';
import classes from './IndexNavbar.module.css';

const IndexNavbar = () => {
  // const [navbarColor, setNavbarColor] = React.useState('');
  const {
    totalPrice,
    itemsCount,
    user,
    token,
    darkMode,
    toggleDarkMode,
  } = React.useContext(AppContext);
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {});
  return (
    <>
      <Navbar
        className='fixed-top '
        expand='lg'
        color={darkMode ? 'white' : 'default'}
        style={{
          boxShadow: darkMode
            ? 'inset rgba(255, 255, 255, 0.1) 0px 2px 0px, inset rgba(255, 255, 255, 0.04) 0px 0px 0px 2px, rgba(0, 0, 0, 0.25) 0px 2px 10px'
            : 'inset rgba(0, 0, 0, 0.1) 0px 2px 0px, inset rgba(0, 0, 0, 0.04) 0px 0px 0px 2px, rgba(255, 255, 255, 0.25) 0px 2px 10px',
        }}
      >
        <Container className={classes.Container}>
          <div className='navbar-translate'>
            <NavbarBrand tag={Link} to='/' style={{ cursor: 'pointer' }}>
              <img
                src='https://img.icons8.com/nolan/64/e-commerce.png'
                alt='...'
                style={{ height: '30px' }}
              />
              El 3oTreya
            </NavbarBrand>
            <button
              className='navbar-toggler navbar-toggler '
              onClick={() => {
                // document.documentElement.classList.toggle('nav-open');
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type='button'
            >
              <span className='navbar-toggler-bar top-bar'></span>
              <span className='navbar-toggler-bar middle-bar'></span>
              <span className='navbar-toggler-bar bottom-bar'></span>
            </button>
          </div>

          <Nav
            navbar
            className={
              collapseOpen ? classes.NavbarActive : classes.NavbarCollapsed
            }
          >
            {token ? (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to='/basket'>
                    <i className='now-ui-icons shopping_cart-simple'></i>
                    <p className={'text-center ' + classes.P}>{itemsCount}</p>
                    <span>{totalPrice.toPrecision(3)} TND</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    style={{ cursor: 'pointer' }}
                    to='/orders'
                  >
                    <i className='now-ui-icons shopping_box'></i>
                    <p className=' pl-3 text-center'>Orders</p>
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color='default'
                    nav
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className='now-ui-icons users_single-02 mr-1'></i>
                    <p className='text-center pl-2'>{user?.name}</p>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      backgroundColor: darkMode ? 'white' : 'black',
                      height: '180px',
                      overflowY: 'hidden',
                    }}
                  >
                    <DropdownItem
                      to={`/profile/${user._id}`}
                      tag={Link}
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                    >
                      <i className='now-ui-icons ui-1_settings-gear-63 pr-2'></i>
                      Settings
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                    >
                      <i className='now-ui-icons design_bullet-list-67 pr-2'></i>
                      Dashboard
                    </DropdownItem>
                    <DropdownItem
                      onClick={toggleDarkMode}
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                    >
                      {!darkMode ? (
                        <React.Fragment>
                          <i className='fa fa-toggle-off pr-2'></i>
                          Light Mode
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <i className='fa fa-toggle-off pr-2'></i>
                          Dark Mode
                        </React.Fragment>
                      )}
                    </DropdownItem>
                    <DropdownItem
                      to='/logout'
                      tag={Link}
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                    >
                      <i className='now-ui-icons ui-1_lock-circle-open  pr-2'></i>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to='/login' style={{ cursor: 'pointer' }}>
                    <p>Connexion</p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to='/register'
                    style={{ cursor: 'pointer' }}
                  >
                    <p>Créer un compte</p>
                  </NavLink>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default IndexNavbar;
