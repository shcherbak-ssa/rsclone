import React from 'react';
import ReactDOM from 'react-dom';
import './index.html';

import { AuthComponent } from './components/auth';

const ROOT_ELEMENT_ID = 'auth';
const DEFAULT_ROUTER_PATHNAME = '';

ReactDOM.render(
  <AuthComponent />,
  document.getElementById(ROOT_ELEMENT_ID)
);
