import React from 'react';
import Loader from 'react-loader-spinner';
import classes from './Spinner.module.css';

const Spinner = (props) => {
  return (
    <div className={classes.Loader}>
      <Loader type='Puff' color='blue' height={100} width={100} />
    </div>
  );
};

export default Spinner;
