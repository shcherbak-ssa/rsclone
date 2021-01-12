import '@babel/polyfill';
import './assets';
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppEvents, DocumentElementIDs, USER_LOCALSTORAGE_KEY } from './constants';
import { UserLocalStorageType } from './types/user.types';
import { EntryContainer } from './containers/entry.container';
import { appController } from './controllers/app.controller';
import { LocalStorageService } from './services/localstorage.service';
import { storeService, StoreService } from './services/store.service';

class AppIniter {
  store: ReduxStore;

  static async initApp() {
    const appIniter: AppIniter = new AppIniter();
    await appIniter.initStore();  
    appIniter.initMode();
  }

  async initStore(): Promise<void> {
    this.store = StoreService.createStore();

    const { userInputsStoreCreator } = await import('./store/user-inputs.store');
    const { languageStoreCreator } = await import('./store/language.store');

    storeService.addStore(userInputsStoreCreator);
    storeService.addStore(languageStoreCreator);
  }

  initMode(): void {
    const localStorageService = new LocalStorageService();
    const localStorageUser: UserLocalStorageType = localStorageService.get(USER_LOCALSTORAGE_KEY);

    if (localStorageUser) {
      appController.emit(AppEvents.INIT_APP, this.renderApp.bind(this));
    } else {
      appController.emit(AppEvents.INIT_AUTHORIZATION, this.renderApp.bind(this));
    }
  }

  renderApp(initialRoutePathname: string): void {
    appController.emit(AppEvents.REMOVE_INIT_EVENTS);
  
    ReactDOM.render(
      <Provider store={this.store}>
        <Router>
          <EntryContainer initialRoutePathname={initialRoutePathname} />
        </Router>
      </Provider>,
      document.getElementById(DocumentElementIDs.ROOT),
    );
  }
}

AppIniter.initApp();
