import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';
import './assets';
import './assets/styles/main.scss';
import './index.html';

import { DocumentElementIDs } from './constants';
import { AppIniter } from './app-initer';

AppIniter.init(renderApp);

function renderApp() {
  console.log('renderApp');

  ReactDOM.render(
    <div>Hello, world!</div>,
    document.getElementById(DocumentElementIDs.ROOT),
  );
}
