import React from 'react';
import ReactDOM from 'react-dom';

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
  <EntryRouter />,
  document.getElementById(ROOT_ELEMENT_ID)
);
