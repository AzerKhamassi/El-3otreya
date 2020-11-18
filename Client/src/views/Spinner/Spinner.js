import React from 'react';
import Loader from 'react-loader-spinner';
import classes from './Spinner.module.css';

const Spinner = (props) => {
  return (
    <div className={classes.Loader}>
      <Loader type='Oval' color='#00BFFF' height={80} width={80} />{' '}
    </div>
  );
};

export default Spinner;
