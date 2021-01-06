enum Constants {
  UPDATE_STATES = 'user-store/update-states',
  UPDATE_EMAIL = 'user-store/update-email',
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

type UpdateEmailActionType = {
  type: Constants.UPDATE_EMAIL,
  email: string,
};

export type UserActionType = UpdateStatesActionType | UpdateEmailActionType;

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
    case Constants.UPDATE_EMAIL:
      return {...state, email: action.email};
    default:
      return state;
  }
}

function updateStates(user: UserStateType): UpdateStatesActionType {
  return {
    type: Constants.UPDATE_STATES, user,
  };
}

function updateEmail(email: string): UpdateEmailActionType {
  return {
    type: Constants.UPDATE_EMAIL, email,
  };
}

export const userStore = {
  reducer: userReducer,
  actions: {
    updateStates,
    updateEmail,
  },
};
