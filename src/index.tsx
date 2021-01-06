import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import '@babel/polyfill';
import './assets/icons';
import './assets/images';
import './assets/favicon.ico';
import './styles/main.scss';
import './index.html';

import { EntryRouter } from './entry-router';

const ROOT_ELEMENT_ID = 'root';

ReactDOM.render(
  <Router>  
    <EntryRouter />
  </Router>,
  document.getElementById(ROOT_ELEMENT_ID)
);
