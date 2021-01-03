import { dispatchAction, storeStates } from "../store";
import { InputsStateType, inputsStore } from "../store/inputs.store";
import { ValidationService } from "../services/validation.service";
import { ERROR_RESPONSE_TYPE, InputLabels } from "../constants";
import { AuthError } from "../errors/auth.error";
import { Response } from "./response.model";
import { LocalStorageService } from "../../services/localstorage.service";
import { USER_LOCALSTORAGE_LABEL } from "../../constants";

const { updateError } = inputsStore.actions;

interface User {
  email: string;
  password: string;
};

interface RegistrationUser extends User {
  name: string;
}

interface LoginUser extends User {}

class AuthModel {
  inputs: InputsStateType;

  constructor() {
    const inputs: InputsStateType = storeStates.getInputs();
    this.inputs = inputs;
  }

  async run() {
    try {
      await this.validateInputs();

      const user: User = this.createUser();
      const response = await this.sendRequest(user);

      this.checkResponse(response);
      this.saveUser(response.payload.id, user.email);
    } catch (error) {
      this.parseError(error);
    }
  }

  async validateInputs() {}

  createUser() {
    return {email: '', password: ''};
  }

  async sendRequest(user: User) {
    try {
      const response = await fetch(location.pathname, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  checkResponse(response: Response) {
    if (response.type === ERROR_RESPONSE_TYPE) {
      const {message, payload} = response;
      throw new AuthError(message, payload.inputLabel);
    }
  }

  saveUser(newUserID: number, email: string) {
    const localStorageService: LocalStorageService = new LocalStorageService();
    localStorageService.save(USER_LOCALSTORAGE_LABEL, {id: newUserID, email});
  }

  parseError(error: Error) {
    if (error instanceof AuthError) {
      const {message, inputLabel} = error;
      dispatchAction(updateError(message, inputLabel));
    } else {
      console.log(error);
    }
  }
}

export class RegistrationModel extends AuthModel {
  static startRegistration() {
    new RegistrationModel().run();
  }

  async validateInputs() {
    const validationService: ValidationService = new ValidationService();

    for (const [, {value, inputLabel}] of Object.entries(this.inputs)) {
      validationService.validate(value.trim(), inputLabel);
    }
  }

  createUser(): RegistrationUser {
    const {name, email, password} = this.inputs;

    return {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };
  }
}

export class LoginModel extends AuthModel {
  static startLogin() {
    new LoginModel().run();
  }

  async validateInputs() {
    const validationService: ValidationService = new ValidationService();

    for (const [label, {value, inputLabel}] of Object.entries(this.inputs)) {
      if (label === InputLabels.NAME_INPUT_LABEL) continue;
      validationService.validate(value.trim(), inputLabel);
    }
  }

  checkResponse(response: Response) {
    if (response.type === ERROR_RESPONSE_TYPE) {
      const {message, payload} = response;

      if (payload.inputLabel) {
        throw new AuthError(message, payload.inputLabel);
      } else {
        console.log(message);
      }
    }
  }

  createUser(): LoginUser {
    const {email, password} = this.inputs;

    return {
      email: email.value.trim(),
      password: password.value.trim(),
    };
  }
}
