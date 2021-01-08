import getKeycode from 'keycode';
import { upperCaseFirst } from 'upper-case-first';

import { KeyboardShortcutType } from '../../core/types';

const PLUS_STRING: string = '+';

export class ShortcutsService {
  private pressedKeyboardKeys: Array<string> = [];
  private keydownHandler = this.handleKeydownEvent.bind(this);
  private keyupHandler = this.handleKeyupEvent.bind(this);
  private setPressedKeyboardKeys: Function;

  constructor(setPressedKeyboardKeys: Function) {
    this.setPressedKeyboardKeys = setPressedKeyboardKeys;
  }

  static transformShortcutKeys(keys: string) {
    return keys.split(PLUS_STRING).map(upperCaseFirst).join(' + ');
  }

  static getSectionShortcuts(
    sectionLabel: string, keyboardShortcuts: Array<KeyboardShortcutType>,
  ) {
    return keyboardShortcuts.filter((keyboardShortcut) => {
      return keyboardShortcut.section === sectionLabel;
    });
  }

  initEvents() {
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
  }

  removeEvents() {
    document.removeEventListener('keydown', this.keydownHandler);
    document.removeEventListener('keyup', this.keyupHandler);
  }

  private handleKeydownEvent(e: KeyboardEvent) {
    const pressedKeyboardKey = getKeycode(e);
    this.pressedKeyboardKeys.push(pressedKeyboardKey);
  }

  private handleKeyupEvent() {
    this.removeDuplicatesFromPressedKeyboardKeys();
    this.setPressedKeyboardKeys([...this.pressedKeyboardKeys].join(PLUS_STRING));
    this.cleanPressesKeyboardKeys();
  }

  private removeDuplicatesFromPressedKeyboardKeys() {
    this.pressedKeyboardKeys = [...new Set(this.pressedKeyboardKeys)];
  }

  private cleanPressesKeyboardKeys() {
    this.pressedKeyboardKeys = [];
  }
}
