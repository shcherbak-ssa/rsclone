import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './assets/icons';
import './assets/favicon.ico';
import './styles/main.scss';
import './index.html';

import { EntryRouter } from './entry-router';

const ROOT_ELEMENT_ID = 'root';

window.onbeforeunload = () => {
  document.cookie = `session=${JSON.stringify({active: false})}`;
}

ReactDOM.render(
  <Router>  
    <EntryRouter />
  </Router>,
  document.getElementById(ROOT_ELEMENT_ID)
);
