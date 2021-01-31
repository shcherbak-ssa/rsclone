import { DropdownNames } from '../constants/ui.constants';

const subscribedDropdowns: Map<DropdownNames, Function> = new Map();
const subscribedForOpenDropdowns: Map<DropdownNames, Function> = new Map();

export class DropdownService {
  static closeDropdowns(): void {
    for (const closeDropdownHandler of subscribedDropdowns.values()) {
      closeDropdownHandler();
    }
  }

  static subscribeDropdownForOpen(dropdownName: DropdownNames, openDropdownHandler: Function): void {
    subscribedForOpenDropdowns.set(dropdownName, openDropdownHandler);
  }

  static openDropdown(dropdownName: DropdownNames): void {
    const openDropdownHandler = subscribedForOpenDropdowns.get(dropdownName);
    openDropdownHandler();
  }

  subscribeDropdown(dropdownName: DropdownNames, closeDropdownHandler: Function) {
    subscribedDropdowns.set(dropdownName, closeDropdownHandler);
  }

  unsubscribeDropdown(dropdownName: DropdownNames) {
    subscribedDropdowns.delete(dropdownName);
  }
}

window.addEventListener('click', DropdownService.closeDropdowns);
