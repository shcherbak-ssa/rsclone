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
  pathname: string,
};

export type NewSpace = {
  name: string,
  color: string,
  logo: string,
  pathname?: string,
};

export type CreatedSpace = {
  name: string,
  color: string,
  logo: string,
  pathname: string,
};

export type UpdatedSpace = {
  id: string,
  updates: {
    [key: string]: string,
  },
};

export type Page = {
  id: string,
  title: string,
  description: string,
  pathname: string,
  nodes: PageNode[],
};

export type PageNode = {};
