export type KeyboardShortcut = {
  section: string,
  keys: string,
  label: string,
};

export type Space = {
  id: string,
  name: string,
  color: string,
  logo: string,
  theme: string,
};

export type NewSpace = {
  name: string,
  color: string,
  logo: string,
  theme: string,
};

export type CreateSpace = {
  name: string,
  color: string,
  logo: string,
};

export type UpdatedSpace = {
  id: string,
  updates: {
    [key: string]: string,
  },
};
