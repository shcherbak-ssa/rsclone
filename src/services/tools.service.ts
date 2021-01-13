import { SelectItemType } from "../components/base/select-item.component";
import { InitialInputState } from "../types/tools.types";
import { InputState } from "../types/user-inputs.types";

export class ToolsService implements InitialInputState {
  getInitialInputState(): InputState {
    return {
      value: '',
      error: '',
    };
  }

  getSelectedValue(items: SelectItemType[], label: string) {
    return items.find((item) => item.label === label);
  }
}
