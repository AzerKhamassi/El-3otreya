/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Container } from 'reactstrap';
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    // if (window.innerWidth > 991) {
    //   const updateScroll = () => {
    //     let windowScrollTop = window.pageYOffset / 3;
    //     pageHeader.current.style.transform =
    //       'translate3d(0,' + windowScrollTop + 'px,0)';
    //   };
    //   window.addEventListener('scroll', updateScroll);
    //   return function cleanup() {
    //     window.removeEventListener('scroll', updateScroll);
    //   };
    // }
  });

  return (
    <>
      <div
        className='page-header'
        style={{ backgroundColor: 'salmon' }}
        ref={pageHeader}
      >
        <Container>
          <div className='content-center brand'>
            <h1 className='h1-seo'>Now UI Kit.</h1>
            <h3>A beautiful Bootstrap 4 UI kit. Yours free.</h3>
          </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
