import { LanguageLabels, SpaceColors, Themes } from "../../common/constants";
import { KeyboardShortcut } from "../../common/entities";
import { UserDataLabels } from "../constants";
import { ToolsService } from "../services/tools.service";

const initialInputState: InputState = new ToolsService().getInitialInputState();

export const initialState: UserDraftStoreState = {
  [UserDataLabels.AVATAR]: initialInputState,
  [UserDataLabels.FULLNAME]: initialInputState,
  [UserDataLabels.EMAIL]: initialInputState,
  [UserDataLabels.PASSWORD]: initialInputState,
  [UserDataLabels.NEW_PASSWORD]: initialInputState,
  [UserDataLabels.USERNAME]: initialInputState,
  [UserDataLabels.THEME]: Themes.ORIGINAL,
  [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH,
  [UserDataLabels.SHORTCUTS]: [],
  [UserDataLabels.SPACE_ID]: '',
  [UserDataLabels.SPACE_NAME]: initialInputState,
  [UserDataLabels.SPACE_COLOR]: SpaceColors.GREEN,
  [UserDataLabels.SPACE_LOGO]: 'space-logo',
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

export type ActiveSpace = {
  id: string,
  name: InputState,
  color: string,
  logo: string,
};

export interface UserDraftStore {
  getDraftState(dataLabel: UserDataLabels): UserDraftState;
  getDraftValues(dataLabels: UserDataLabels[]): UserDraftStoreState;
  updateValue(updatedDraft: UpdatedDraft): void;
  setError(updatedDraft: UpdatedDraft): void;
  resetStates(resetedStates: UserDraftStoreState): void;
  setActiveSpace(activeSpace: ActiveSpace): void;
};
