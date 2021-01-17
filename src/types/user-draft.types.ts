import { LanguageLabels, Themes } from "../../common/constants";
import { KeyboardShortcut } from "../../common/entities";
import { UserDataLabels } from "../constants";
import { ToolsService } from "../services/tools.service";

const initialInputState: InputState = new ToolsService().getInitialInputState();

export const initialState: UserDraftStoreState = {
  [UserDataLabels.AVATAR]: '',
  [UserDataLabels.FULLNAME]: initialInputState,
  [UserDataLabels.EMAIL]: initialInputState,
  [UserDataLabels.PASSWORD]: initialInputState,
  [UserDataLabels.USERNAME]: initialInputState,
  [UserDataLabels.THEME]: Themes.ORIGINAL,
  [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH,
  [UserDataLabels.SHORTCUTS]: [],
};

export type UserDraftStoreState = {
  [key: string]: UserDraftState;
};

export type InputState = {
  value: string;
  error: string;
};

export type UserDraftState = string | InputState | KeyboardShortcut[];

export type UpdatedDraft = {
  [key: string]: UserDraftState;
};

export interface UserDraftStore {
  getDraftState(dataLabel: UserDataLabels): UserDraftState;
  getDraftValues(dataLabels: UserDataLabels[]): UserDraftStoreState;
  updateValue(updatedDraft: UpdatedDraft): void;
  setError(updatedDraft: UpdatedDraft): void;
  resetStates(resetedStates: UserDraftStoreState): void;
};
