import { dispatchAction, storeStates } from "../store";
import { InputsStateType, inputsStore } from "../store/inputs.store";
import {
  ValidationError,
  ValidationService,
} from "../services/validation.service";

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

    try {
      registrationModel.run();
    } catch (error) {
      registrationModel.parseError(error);
    }
  }

  run() {
    this.validateInputs();

    const user: User = this.createUser();
    // const response = await this.sendRequest(user);
  }

  parseError(error: Error) {
    if (error instanceof ValidationError) {
      dispatchAction(updateError(error.message, error.inputLabel));
    } else {
      console.log(error);
    }
  }

  private validateInputs() {
    const validationService: ValidationService = new ValidationService();

    for (const [, {value, inputLabel}] of Object.entries(this.inputs)) {
      validationService.validate(value, inputLabel);
    }
  }

  private createUser(): User {
    const {name, email, password} = this.inputs;

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  }

  private async sendRequest(user: User) {

  }
}
