enum Constants {
  UPDATE_STATES = 'user-store/update-states',
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

export type UserActionType = UpdateStatesActionType;

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
    default:
      return state;
  }
}

function updateStates(
  user: UserStateType,
): UpdateStatesActionType {
  return {
    type: Constants.UPDATE_STATES, user,
  };
}

export const userStore = {
  reducer: userReducer,
  actions: {
    updateStates,
  },
};
