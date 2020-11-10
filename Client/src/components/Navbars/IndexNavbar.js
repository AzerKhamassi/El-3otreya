import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  Collapse,
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
      {collapseOpen ? (
        <div
        // id='bodyClick'
        // onClick={() => {
        //   document.documentElement.classList.toggle('nav-open');
        //   setCollapseOpen(false);
        // }}
        />
      ) : null}
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
        <Container>
          <div className='navbar-translate'>
            <NavbarBrand tag={Link} to='/' style={{ cursor: 'pointer' }}>
              El 3oTreya
            </NavbarBrand>
            <button
              className='navbar-toggler navbar-toggler'
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

          <Nav navbar>
            {token ? (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to='/basket'>
                    <i className='now-ui-icons shopping_cart-simple'></i>
                    <p className={classes.P}>{itemsCount}</p>
                    <span>{totalPrice.toPrecision(3)} TND</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ cursor: 'pointer' }}>
                    <i className='now-ui-icons shopping_box'></i>
                    <p>Ordres</p>
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
                    <p>{user.name}</p>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ backgroundColor: darkMode ? 'white' : 'black' }}
                  >
                    <DropdownItem
                      to={`/profile/${user._id}`}
                      tag={Link}
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                    >
                      <i className='now-ui-icons ui-1_settings-gear-63 mr-1'></i>
                      Settings
                    </DropdownItem>
                    <DropdownItem
                      onClick={toggleDarkMode}
                      style={{
                        color: darkMode ? 'black' : 'white',
                      }}
                    >
                      {!darkMode ? (
                        <React.Fragment>
                          <i className={'fa fa-toggle-off'}></i>
                          Mode normal
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <i className={'fa fa-toggle-off'}></i>
                          Mode Sombre
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
                      <i className='now-ui-icons ui-1_lock-circle-open mr-1'></i>
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
