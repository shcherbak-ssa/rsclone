import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';
import './assets';
import './assets/styles/main.scss';
import './index.html';

import { DocumentElementIDs } from './constants';
import { AppIniter } from './app-initer';
import { EntryContainer } from './containers/entry.container';

AppIniter.init(renderApp);

function renderApp(initialRoutePathname: string) {
  ReactDOM.render(
    <EntryContainer initialRoutePathname={initialRoutePathname} />,
    document.getElementById(DocumentElementIDs.ROOT),
  );
}
