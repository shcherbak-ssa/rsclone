export type SelectItemType = {
  label: string,
  value: string,
};

export type SelectItemTheme = {
  label: string,
  image: string,
  description: string,
};

export type SelectAction = {
  isSelected: boolean,
  toggleSelection: Function,
};
