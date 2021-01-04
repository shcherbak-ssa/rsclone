import { MenuItemLabels } from "../constants";

enum Constants {
  CHANGE_MENU_ITEM = 'app-store/change-menu-item',
};

type ChangeMenuItemActionType = {
  type: Constants.CHANGE_MENU_ITEM,
  nextMenuItem: MenuItemLabels,
};

export type AppActionType = ChangeMenuItemActionType;

export type AppStateType = {
  activeMenuItem: MenuItemLabels,
};

const initialState: AppStateType = {
  activeMenuItem: MenuItemLabels.SPACES,
};

function appReducer(
  state: AppStateType = initialState,
  action: AppActionType
): AppStateType {
  switch (action.type) {
    case Constants.CHANGE_MENU_ITEM:
      return {...state, activeMenuItem: action.nextMenuItem};
    default:
      return state;
  }
}

function changeMenuItem(
  nextMenuItem: MenuItemLabels,
): ChangeMenuItemActionType {
  return {
    type: Constants.CHANGE_MENU_ITEM, nextMenuItem,
  };
}

export const appStore = {
  reducer: appReducer,
  actions: {
    changeMenuItem,
  },
};
