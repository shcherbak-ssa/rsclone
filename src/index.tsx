import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';
import './assets';
import './assets/styles/main.scss';
import './index.html';

import { AppEvents, DocumentElementIDs } from './constants';
import { AppIniter } from './app-initer';
import { EntryContainer } from './containers/entry.container';
import { appController } from './controllers/app.controller';

AppIniter.init(renderApp);

function renderApp(initialRoutePathname: string) {
  appController.emit(AppEvents.REMOVE_INIT_EVENTS);

  ReactDOM.render(
    <EntryContainer initialRoutePathname={initialRoutePathname} />,
    document.getElementById(DocumentElementIDs.ROOT),
  );
}
