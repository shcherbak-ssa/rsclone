import { DropdownItemLabels } from '../constants';

export type DropdownItem = {
  icon: object,
  text: string,
  label?: DropdownItemLabels,
  href?: string,
};
