import keycode from 'keycode';
import { upperCaseFirst } from 'upper-case-first';

export class ShortcutsService {
  private pressedKeyboardKeys: Array<string> = [];
  private keydownHandler = this.handleKeydownEvent.bind(this);
  private keyupHandler = this.handleKeyupEvent.bind(this);
  private setPressedKeyboardKeys: Function;

  constructor(setPressedKeyboardKeys: Function) {
    this.setPressedKeyboardKeys = setPressedKeyboardKeys;
  }

  static transformShortcutKeys(keys: string) {
    return upperCaseFirst(keys.replace(/\+/g, ' + '));
  }

  initEvents() {
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
  }

  removeEvents() {
    document.removeEventListener('keydown', this.keydownHandler);
    document.removeEventListener('keyup', this.keyupHandler);

    this.cleanPressesKeyboardKeys();
  }

  private handleKeydownEvent(e: KeyboardEvent) {
    const pressedKeyboardKey = keycode(e);
    this.pressedKeyboardKeys.push(pressedKeyboardKey);
  }

  private handleKeyupEvent() {
    this.removeDuplicatesFromPressedKeyboardKeys();
    this.setPressedKeyboardKeys([...this.pressedKeyboardKeys]);

    this.removeEvents();
  }

  private removeDuplicatesFromPressedKeyboardKeys() {
    this.pressedKeyboardKeys = [...new Set(this.pressedKeyboardKeys)];
  }

  private cleanPressesKeyboardKeys() {
    this.pressedKeyboardKeys = [];
  }
}
