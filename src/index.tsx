import '@babel/polyfill';
import './assets';
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppEvents, DocumentElementIDs } from './constants';
import { EntryContainer } from './containers/entry.container';
import { appController } from './controllers/app.controller';
import { StoreService } from './services/store.service';
import { AppIniter } from './app-initer';

const store = StoreService.createStore();
AppIniter.init(renderApp);

function renderApp(initialRoutePathname: string) {
  appController.emit(AppEvents.REMOVE_INIT_EVENTS);

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <EntryContainer initialRoutePathname={initialRoutePathname} />
      </Router>
    </Provider>,
    document.getElementById(DocumentElementIDs.ROOT),
  );
}
