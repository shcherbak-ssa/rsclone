import { InputLabels } from "../../constants";

enum Constants {
  UPDATE_STATES = 'user-store/update-states',
  UPDATE_DATA = 'user-store/update-data',
};

export type UserStateType = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  username: string;
  theme: string;
  language: string;
};

type UpdateStatesActionType = {
  type: Constants.UPDATE_STATES,
  user: UserStateType,
};

type UpdateDataActionType = {
  type: Constants.UPDATE_DATA,
  label: InputLabels,
  value: string,
};

export type UserActionType = UpdateStatesActionType | UpdateDataActionType;

const initialState: UserStateType = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
  username: '',
  theme: '',
  language: '',
};

function userReducer(
  state: UserStateType = initialState,
  action: UserActionType,
): UserStateType {
  switch (action.type) {
    case Constants.UPDATE_STATES:
      return action.user;
    case Constants.UPDATE_DATA:
      return {...state, [action.label]: action.value};
    default:
      return state;
  }
}

function updateStates(user: UserStateType): UpdateStatesActionType {
  return {
    type: Constants.UPDATE_STATES, user,
  };
}

function updateData(label: InputLabels, value: string): UpdateDataActionType {
  return {
    type: Constants.UPDATE_DATA, label, value,
  };
}

export const userStore = {
  reducer: userReducer,
  actions: {
    updateStates,
    updateData,
  },
};
