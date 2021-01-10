import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';
import './assets';
import './assets/styles/main.scss';
import './index.html';

import { DocumentElementIDs } from './constants';

ReactDOM.render(
  <div>Hello, world!</div>,
  document.getElementById(DocumentElementIDs.ROOT),
);
