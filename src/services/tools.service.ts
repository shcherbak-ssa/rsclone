import { InitialInputState } from "../types/tools.types";

export class ToolsService implements InitialInputState {
  getInitialInputState() {
    return {
      value: '',
      error: '',
    };
  }
}
