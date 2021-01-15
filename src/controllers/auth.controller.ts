import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { AuthEvents } from '../constants/events.constants';
import { RegistrationModel } from '../models/auth/registration.model';
import { LoginModel } from '../models/auth/login.model';
import { AuthModel } from '../models/auth/auth.model';

export const authController: Controller = new EventEmitter();

authController
  .on(AuthEvents.REMOVE_ERROR, removeErrorHandler)
  .on(AuthEvents.INIT_REGISTRATION, initRegistraionHandler)
  .on(AuthEvents.INIT_LOGIN, initLoginHanlder);
  
async function removeErrorHandler() {
  const authModel: AuthModel = new AuthModel();
  authModel.removeError();
}

async function initRegistraionHandler(callback: Function) {
  const registrationModel: RegistrationModel = new RegistrationModel();
  await registrationModel.createUser();

  callback();
}

async function initLoginHanlder(callback: Function) {
  const loginModel: LoginModel = new LoginModel();
  await loginModel.loginUser();

  callback();
}
