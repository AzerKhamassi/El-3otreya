import { AppContext } from 'context/AppContext';
import React from 'react';

// reactstrap components
import { Container } from 'reactstrap';

// core components

const ProfilePageHeader = () => {
  let pageHeader = React.createRef();
  const { user } = React.useContext(AppContext);
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
      };
    }
  });
  return (
    <>
      <div style={{ paddingTop: '100px' }}>
        <div ref={pageHeader}></div>
        <Container>
          <div className='photo-container'>
            <img alt='...' src={require('assets/img/ryan.jpg')}></img>
          </div>
          <h3 className='title'>{user.name}</h3>
          <p className='category'>Photographer</p>
          <div className='content'>
            <div className='social-description'>
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div className='social-description'>
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div className='social-description'>
              <h2>48</h2>
              <p>Bookmarks</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProfilePageHeader;
