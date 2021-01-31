import { DropdownNames } from '../constants/ui.constants';

const subscribedDropdowns: Map<DropdownNames, Function> = new Map();

export class DropdownService {
  static closeDropdowns() {
    for (const closeDropdownHandler of subscribedDropdowns.values()) {
      closeDropdownHandler();
    }
  }

  subscribeDropdown(dropdownName: DropdownNames, closeDropdownHandler: Function) {
    subscribedDropdowns.set(dropdownName, closeDropdownHandler);
  }

  unsubscribeDropdown(dropdownName: DropdownNames) {
    subscribedDropdowns.delete(dropdownName);
  }
}

window.addEventListener('click', DropdownService.closeDropdowns);
