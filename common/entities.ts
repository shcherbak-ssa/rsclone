export type KeyboardShortcut = {
  section: string,
  keys: string,
  label: string,
};

export type Space = {
  id: string,
  title: string,
  color: string,
  icon: string,
  theme: string,
};

export type NewSpace = {
  title: string,
  color: string,
  icon: string,
  theme: string,
};

export type CreateSpace = {
  title: string,
  color: string,
  icon: string,
};

export type UpdatedSpace = {
  id: string,
  updates: {
    [key: string]: string,
  },
};
