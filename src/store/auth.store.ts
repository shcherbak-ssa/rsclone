import { UserDataLabels } from '../constants';
import { Store, store, StoreAction, StoreReducer, StoreStateGetter, StoreStates, StoreType } from '../services/store.service';

enum Constants {
  AUTH_STORE = 'auth-store',
  UPDATE_INPUT_VALUE = 'auth-store/update-input-value',
  UPDATE_INPUT_ERROR = 'auth-store/update-input-error',
  SET_FORM_ERROR = 'auth-store/set-form-error',
  REMOVE_FORM_ERROR = 'auth-store/remove-form-error',
  RESET_INPUTS_STATES = 'auth-store/reset-inputs-states',
};

type AuthStoreStates = StoreStates | {
  formError: string;
  inputs: {
    [UserDataLabels.FULLNAME]: {
      value: string;
      error: string;
    };
    [UserDataLabels.EMAIL]: {
      value: string;
      error: string;
    };
    [UserDataLabels.PASSWORD]: {
      value: string;
      error: string;
    };
  };
};

const initialState: AuthStoreStates = {
  formError: '',
  inputs: {
    [UserDataLabels.FULLNAME]: {
      value: '',
      error: '',
    },
    [UserDataLabels.EMAIL]: {
      value: '',
      error: '',
    },
    [UserDataLabels.PASSWORD]: {
      value: '',
      error: '',
    },
  },
};

type UpdateInputValueAction = {
  type: Constants.UPDATE_INPUT_VALUE;
  payload: {
    value: string;
    inputLabel: UserDataLabels;
  };
};

type AuthStoreAction = StoreAction | UpdateInputValueAction;

const authStoreReducer: StoreReducer = (
  state: AuthStoreStates = initialState, {type, payload}: AuthStoreAction,
): AuthStoreStates => {
  switch (type) {
    case Constants.UPDATE_INPUT_VALUE:
      return Object.assign(
        {},
        state,
        {
          [payload.inputLabel]: {
            value: payload.value, 
          }
        }
      );
    default:
      return state;
  }
}

export const authStore: StoreType = {
  storeName: Constants.AUTH_STORE,
  reducer: authStoreReducer,
};

export const authStoreGetters: { [key: string]: StoreStateGetter } = {
  [UserDataLabels.FULLNAME]: {
    storeName: Constants.AUTH_STORE,
    filter: (states: AuthStoreStates) => {
      return states[UserDataLabels.FULLNAME];
    },
  },
};

export class AuthStore extends Store {
  constructor() {
    super();
    this.storeName = Constants.AUTH_STORE;
  }

  updateInputValue(value: string, inputLabel: UserDataLabels) {
    store.dispatchAction(
      this.getStoreDispatch(
        Constants.UPDATE_INPUT_VALUE, { value, inputLabel },
      )
    );
  }
}
