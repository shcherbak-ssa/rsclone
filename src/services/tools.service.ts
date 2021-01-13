import { InitialInputState } from "../types/tools.types";
import { InputState } from "../types/user-inputs.types";

export class ToolsService implements InitialInputState {
  getInitialInputState(): InputState {
    return {
      value: '',
      error: '',
    };
  }
}
