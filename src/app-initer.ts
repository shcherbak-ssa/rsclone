import { AppEvents, USER_LOCALSTORAGE_KEY } from './constants';
import { appController } from './controllers/app.controller';
import { LocalStorageService } from './services/localstorage.service';

export class AppIniter {
  static async init(renderAppCallback: Function) {
    const appIniter = new AppIniter();

    const localStorageService = new LocalStorageService();
    const localStorageUser = localStorageService.get(USER_LOCALSTORAGE_KEY);

    if (localStorageUser) {
      appIniter.initApp();
    }

    renderAppCallback();
  }

  initApp() {
    appController.emit(AppEvents.INIT_APP);
    console.log('initApp');
  }
}
