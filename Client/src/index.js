import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'font-awesome/css/font-awesome.css';
import 'assets/css/bootstrap.min.css';
import 'assets/scss/now-ui-kit.scss?v=1.4.0';
// import 'assets/demo/demo.css?v=1.4.0';
import 'assets/demo/nucleo-icons-page-styles.css?v=1.4.0';

// styles for this kit

// pages for this kit

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));
