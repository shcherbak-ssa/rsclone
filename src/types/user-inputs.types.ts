import { LanguageLabels, Themes } from "../../common/constants";
import { KeyboardShortcut } from "../../common/entities";
import { UserDataLabels } from "../constants";
import { ToolsService } from "../services/tools.service";

const initialInputState: InputState = new ToolsService().getInitialInputState();

export const initialState: UserInputsStoreState = {
  [UserDataLabels.AVATAR]: false,
  [UserDataLabels.FULLNAME]: initialInputState,
  [UserDataLabels.EMAIL]: initialInputState,
  [UserDataLabels.PASSWORD]: initialInputState,
  [UserDataLabels.USERNAME]: initialInputState,
  [UserDataLabels.THEME]: Themes.ORIGINAL,
  [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH,
  [UserDataLabels.SHORTCUTS]: [],
};

export type UserInputsStoreState = {
  [key: string]: UserInputState;
};

export type InputState = {
  value: string;
  error: string;
};

export type UserInputState = string | boolean | InputState | KeyboardShortcut[];

export type UpdatedInput = {
  [key: string]: UserInputState;
};

export interface UserInputsStore {
  getInputState(dataLabel: UserDataLabels): UserInputState;
  getInputValues(dataLabels: UserDataLabels[]): UserInputsStoreState;
  updateInputValue(updatedInput: UpdatedInput): void;
  setInputError(updatedInput: UpdatedInput): void;
  changeLanguage(nextLanguage: LanguageLabels): void;
  changeTheme(nextTheme: Themes): void;
  resetStates(resetedStates: UserInputsStoreState): void;
};
