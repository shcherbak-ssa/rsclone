enum Constants {
  SET_ERROR = 'form-store/set-error',
  REMOVE_ERROR = 'form-store/remove-error',
};

type SetErrorActionType = {
  type: typeof Constants.SET_ERROR,
  error: string,
};

type RemoveErrorActionType = {
  type: typeof Constants.REMOVE_ERROR,
};

export type FormActionType = SetErrorActionType | RemoveErrorActionType;

export type FormStateType = {
  formError: string,
};

const initialState: FormStateType = {
  formError: '',
};

function formReducer(
  state: FormStateType = initialState,
  action: FormActionType,
): FormStateType {
  switch (action.type) {
    case Constants.SET_ERROR:
      return { formError: action.error };
    case Constants.REMOVE_ERROR:
      return { formError: '' };
    default:
      return state;
  }
}

function setFormError(error: string): SetErrorActionType {
  return {
    type: Constants.SET_ERROR,
    error,
  };
}

function removeFormError(): RemoveErrorActionType {
  return {
    type: Constants.REMOVE_ERROR,
  };
}

export const formStore = {
  reducer: formReducer,
  actions: {
    setFormError,
    removeFormError,
  },
};
