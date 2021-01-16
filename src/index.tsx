import '@babel/polyfill';
import './assets';

import React from 'react';
import ReactDOM from 'react-dom';
import { Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { DocumentElementIDs } from './constants/ui.constants';
import { AppEvents } from './constants/events.constants';
import { Stores } from './constants';
import { EntryContainer } from './containers/entry.container';
import { appController } from './controllers/app.controller';
import { StoreService } from './services/store.service';
import { StoreManager } from './types/store.types';
import { StoreManagerService } from './services/store-manager.service';
import { UserLocalStorage } from './types/services.types';
import { UserLocalStorageService } from './services/user-local-storage.service';

class AppIniter {
  store: ReduxStore;

  static async initApp() {
    const appIniter: AppIniter = new AppIniter();
    await appIniter.initStore();  
    appIniter.initMode();
  }

  async initStore(): Promise<void> {
    this.store = StoreService.createStore();

    const storeManager: StoreManager = new StoreManagerService();
    await storeManager.addStore(Stores.LANGUAGE_STORE);
    await storeManager.addStore(Stores.USER_INPUTS_STORE);
  }

  initMode(): void {
    const userLocalStorage: UserLocalStorage = new UserLocalStorageService();

    if (userLocalStorage.exist()) {
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
