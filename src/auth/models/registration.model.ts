import { dispatchAction, storeStates } from "../store";
import { InputsStateType, inputsStore } from "../store/inputs.store";
import { ValidationService } from "../services/validation.service";
import { ERROR_RESPONSE_TYPE } from "../constants";
import { AuthError } from "../errors/auth.error";
import { Response } from "./response.model";

const { updateError } = inputsStore.actions;

type User = {
  name: string,
  email: string,
  password: string,
};

export class RegistrationModel {
  private inputs: InputsStateType;

  constructor(inputs: InputsStateType) {
    this.inputs = inputs;
  }
  
  static startRegistration() {
    const inputs: InputsStateType = storeStates.getInputs();
    const registrationModel: RegistrationModel = new RegistrationModel(inputs);
    registrationModel.run();
  }

  async run() {
    try {
      await this.validateInputs();

      const user: User = this.createUser();
      const response = await this.sendRequest(user);
      this.checkResponse(response);

      console.log(response);
    } catch (error) {
      this.parseError(error);
    }
  }

  private async validateInputs() {
    const validationService: ValidationService = new ValidationService();

    for (const [, {value, inputLabel}] of Object.entries(this.inputs)) {
      validationService.validate(value.trim(), inputLabel);
    }
  }

  private createUser(): User {
    const {name, email, password} = this.inputs;

    return {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };
  }

  private async sendRequest(user: User) {
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

  private checkResponse(response: Response) {
    if (response.type === ERROR_RESPONSE_TYPE) {
      const {message, payload} = response;
      throw new AuthError(message, payload.inputLabel);
    }
  }

  private parseError(error: Error) {
    if (error instanceof AuthError) {
      const {message, inputLabel} = error;
      dispatchAction(updateError(message, inputLabel));
    } else {
      console.log(error);
    }
  }
}
