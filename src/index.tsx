import '@babel/polyfill';
import './assets';
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppEvents, DocumentElementIDs } from './constants';
import { EntryContainer } from './containers/entry.container';
import { appController } from './controllers/app.controller';
import { storeService, StoreService } from './services/store.service';
import { AppIniter } from './app-initer';

initApp();

async function initApp() {
  const store: ReduxStore = StoreService.createStore();
  const {userInputsStoreCreator} = await import('./store/user-inputs.store');
  
  storeService.addStore(userInputsStoreCreator);
  AppIniter.init(renderApp.bind(null, store));
}

function renderApp(store: ReduxStore, initialRoutePathname: string) {
  appController.emit(AppEvents.REMOVE_INIT_EVENTS);
  console.log(storeService);

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <EntryContainer initialRoutePathname={initialRoutePathname} />
      </Router>
    </Provider>,
    document.getElementById(DocumentElementIDs.ROOT),
  );
}
