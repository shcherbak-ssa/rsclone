import getKeycode from 'keycode';
import { upperCaseFirst } from 'upper-case-first';

import { KeyboardShortcut } from '../../common/entities';
import { JOIN_SHORTCUT_KEYS_STRING, PLUS_STRING } from '../constants';

export class ShortcutsService {
  private pressedKeyboardKeys: Array<string> = [];
  private keydownHandler = this.handleKeydownEvent.bind(this);
  private keyupHandler = this.handleKeyupEvent.bind(this);
  private setPressedKeyboardKeys: Function;

  constructor(setPressedKeyboardKeys: Function) {
    this.setPressedKeyboardKeys = setPressedKeyboardKeys;
  }

  static transformShortcutKeys(keys: string) {
    return keys.split(PLUS_STRING).map(upperCaseFirst).join(JOIN_SHORTCUT_KEYS_STRING);
  }

  static getSectionShortcuts(
    sectionLabel: string, keyboardShortcuts: Array<KeyboardShortcut>,
  ) {
    return keyboardShortcuts.filter((keyboardShortcut) => {
      return keyboardShortcut.section === sectionLabel;
    });
  }

  static filterUpdated(
    draftShortcuts: KeyboardShortcut[], currentShortcuts: KeyboardShortcut[]
  ): KeyboardShortcut[] {
    return draftShortcuts.filter((draftShortcut, index) => {
      return draftShortcut.keys !== currentShortcuts[index].keys;
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
