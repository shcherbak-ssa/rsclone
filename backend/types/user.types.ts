import { KeyboardShortcutType } from "./keyboard-shortcuts.types";

export type UserType = {
  userID: string;
  name: string;
  email: string;
  password: string;
  username: string;
  avatar: boolean;
  language: string;
  theme: string;
  shortcuts: Array<KeyboardShortcutType>;
};
