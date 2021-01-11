import { UserDataLabels } from "../constants";

export type UpdateInput = {
  value: string;
  inputLabel: UserDataLabels;
};

export type SetError = {
  error: string;
  inputLabel: UserDataLabels;
};
