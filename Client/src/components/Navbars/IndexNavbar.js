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
    loading,
  } = React.useContext(AppContext);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseDropdown, setCollapseDropdown] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setCollapseDropdown(false);
        setCollapseOpen(false);
      }
    });
  }, []);
  const togglerHandler = () => {
    setCollapseOpen(!collapseOpen);
    if (!collapseOpen) {
      setCollapseDropdown(false);
    }
  };
  return (
    <>
      <Navbar
        className='fixed-top '
        expand='lg'
        color={darkMode ? 'white' : 'default'}
        style={{
          boxShadow: darkMode
            ? 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px, inset rgba(255, 255, 255, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.25) 0px 1px 3px'
            : 'inset rgba(0, 0, 0, 0.1) 0px 1px 0px, inset rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(255, 255, 255, 0.25) 0px 1px 3px',
        }}
      >
        <Container className={classes.Container}>
          <div className='navbar-translate'>
            <NavbarBrand
              onClick={() => setCollapseOpen(false)}
              tag={Link}
              to='/'
              style={{ cursor: 'pointer' }}
            >
              <img
                src='https://img.icons8.com/nolan/64/e-commerce.png'
                alt='...'
                style={{ height: '30px' }}
              />
              El 3oTreya
            </NavbarBrand>
            {token && (
              <button
                className='navbar-toggler navbar-toggler '
                onClick={() => togglerHandler()}
                aria-expanded={collapseOpen}
                type='button'
              >
                <span className='navbar-toggler-bar top-bar'></span>
                <span className='navbar-toggler-bar middle-bar'></span>
                <span className='navbar-toggler-bar bottom-bar'></span>
              </button>
            )}
          </div>

          <Nav
            navbar
            className={
              collapseOpen ? classes.NavbarActive : classes.NavbarCollapsed
            }
            style={
              screenWidth < 768
                ? {
                    height: collapseDropdown
                      ? user?.isAdmin
                        ? '290px'
                        : '260px'
                      : '130px',
                    overflow: 'hidden',
                  }
                : null
            }
          >
            {token ? (
              <React.Fragment>
                <NavItem
                  className='text-center'
                  onClick={() => setCollapseOpen(false)}
                >
                  <NavLink tag={Link} to='/basket'>
                    <i className='now-ui-icons shopping_cart-simple'></i>
                    <p className={'text-center ' + classes.P}>{itemsCount}</p>
                    <span>{totalPrice.toPrecision(3)} TND</span>
                  </NavLink>
                </NavItem>
                <NavItem
                  className='text-center '
                  onClick={() => setCollapseOpen(false)}
                >
                  <NavLink
                    tag={Link}
                    style={{ cursor: 'pointer' }}
                    to='/orders'
                  >
                    <i className='now-ui-icons shopping_box mr-1'></i>
                    <p className='text-center'>Orders</p>
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    className='text-center px-0 pl-2'
                    color='default'
                    nav
                    onClick={(e) => {
                      e.preventDefault();
                      setCollapseDropdown(
                        (prevCollapseDropdown) => !prevCollapseDropdown
                      );
                    }}
                  >
                    <i className='now-ui-icons users_single-02 mr-1'></i>
                    <p className='text-center '>
                      {loading ? 'loading' : user?.name}
                    </p>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      backgroundColor: darkMode ? 'white' : 'black',
                      overflowY: 'hidden',
                      height: screenWidth < 768 ? '280px' : '180px',
                    }}
                  >
                    <DropdownItem
                      to={`/profile/${user?._id}`}
                      tag={Link}
                      onClick={() => setCollapseOpen(false)}
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                    >
                      <i className='now-ui-icons users_circle-08 pr-2'></i>
                      See your profile
                    </DropdownItem>
                    {user?.isAdmin && (
                      <DropdownItem
                        to='/admin'
                        tag={Link}
                        onClick={() => setCollapseOpen(false)}
                        style={{
                          color: darkMode ? 'black' : 'white',
                        }}
                      >
                        <i className='now-ui-icons design_bullet-list-67 pr-2'></i>
                        Dashboard
                      </DropdownItem>
                    )}

                    <DropdownItem
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                      onClick={() => {
                        setCollapseOpen(false);
                        toggleDarkMode();
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
                      onClick={() => setCollapseOpen(false)}
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
              <React.Fragment></React.Fragment>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default IndexNavbar;
