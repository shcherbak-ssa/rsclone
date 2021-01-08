export type KeyboardShortcutType = {
  title: string,
  description: string,
  section: string,
  keys: string,
  label: string,
};

export type UserType = {
  id: number,
  name: string,
  email: string,
  password?: string,
  username: string,
  avatar: string,
  theme: string,
  language: string,
  keyboardShortcuts: Array<KeyboardShortcutType>,
};
