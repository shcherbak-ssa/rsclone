import { InputLabels } from "../constants";
import { dispatchAction, storeStates } from "../store";
import { inputsStore } from "../store/inputs.store";

const { updateValue, updateError } = inputsStore.actions;

export class InputsModel {
  updateValue(value: string, inputLabel: InputLabels) {
    dispatchAction(updateValue(value, inputLabel));

    if (storeStates.getInput(inputLabel).error) {
      dispatchAction(updateError('', inputLabel));
    }
  }
}
