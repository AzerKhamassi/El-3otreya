import { AppContext } from 'context/AppContext';
import React from 'react';

const Logout = (props) => {
  const { logoutUser } = React.useContext(AppContext);
  React.useEffect(() => {
    logoutUser();
    props.history.replace('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
};

export default Logout;
