import { InitialInputState } from '../types/tools.types';
import { InputState } from '../types/user-draft.types';

export class ToolsService implements InitialInputState {
  getInitialInputState(): InputState {
    return {
      value: '',
      error: '',
    };
  }

  getSelectedItem(items: Array<{label: string}>, label: string): {label: string} {
    return items.find((item) => item.label === label);
  }
}
