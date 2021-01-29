import { AnyAction } from 'redux';

import { Page } from '../../common/entities';
import { Stores } from '../constants';
import { StoreCreator } from '../services/store-manager.service';
import { StoreSelectors } from '../services/store-selectors.service';
import { reduxStore } from '../services/store.service';
import { ActiveSpaceStore, ActiveSpaceStoreState, initialState } from '../types/active-space.types';

enum Constants {
  SET_IS_OPEN = 'active-space-store/set-is-open',
  OPEN_SPACE = 'active-space-store/open-space',
  CLOSE_SPACE = 'active-space-store/close-space',
  ADD_PAGE = 'active-space-store/add-page',
  SET_ACTIVE_PAGE = 'active-space-store/set-active-page',
};

/** types */
type ActiveSpaceStoreSelector = {
  [Stores.ACTIVE_SPACE_STORE]: ActiveSpaceStoreState
};

type SetIsOpenAction = {
  type: Constants.SET_IS_OPEN,
  payload: {
    isOpen: boolean,
  },
};

type OpenSpaceAction = {
  type: Constants.OPEN_SPACE,
  payload: {
    pages: Page[],
  },
};

type CloseSpaceAction = {
  type: Constants.CLOSE_SPACE,
  payload: {},
};

type AddPageAction = {
  type: Constants.ADD_PAGE,
  payload: {
    page: Page,
  },
};

type SetActivePageAction = {
  type: Constants.SET_ACTIVE_PAGE,
  payload: {
    page: Page,
  },
};

type ActiveSpaceStoreAction =
  | AnyAction
  | SetIsOpenAction
  | OpenSpaceAction
  | CloseSpaceAction
  | AddPageAction
  | SetActivePageAction;

/** constants */
const activeSpaceStoreSelectors: StoreSelectors = {
  getIsOpen: () => {
    return (state: ActiveSpaceStoreSelector) => {
      return state[Stores.ACTIVE_SPACE_STORE].isOpen;
    };
  },

  getActivePage: () => {
    return (state: ActiveSpaceStoreSelector) => {
      return state[Stores.ACTIVE_SPACE_STORE].activePage;
    };
  },

  getPageTitles: () => {
    return (state: ActiveSpaceStoreSelector) => {
      const {pages} = state[Stores.ACTIVE_SPACE_STORE];
      return pages.map((page) => page.title);
    };
  },
};

class ActiveSpaceStoreImpl implements ActiveSpaceStore {
  getPages(): Page[] {
    return reduxStore.getState()[Stores.ACTIVE_SPACE_STORE].pages;
  }

  setIsOpen(isOpen: boolean): void {
    reduxStore.dispatch(
      setIsOpenAction(isOpen)
    );
  }

  openSpace(pages: Page[]): void {
    reduxStore.dispatch(
      openSpaceAction(pages)
    );
  }

  closeSpace(): void {
    reduxStore.dispatch(
      closeSpaceAction()
    );
  }

  addPage(page: Page): void {
    reduxStore.dispatch(
      addPageAction(page)
    );
  }

  setActivePage(page: Page): void {
    reduxStore.dispatch(
      setActivePageAction(page)
    );
  }
}

/** store creator */
export const activeSpaceStoreCreator: StoreCreator = {
  store: new ActiveSpaceStoreImpl(),
  storeSelectors: activeSpaceStoreSelectors,
  storeReducer: activeSpaceStoreReducer,
};

/** recuder */
function activeSpaceStoreReducer(
  state: ActiveSpaceStoreState = initialState, {type, payload}: ActiveSpaceStoreAction
): ActiveSpaceStoreState {
  switch (type) {
    case Constants.SET_IS_OPEN:
      return {
        ...state,
        isOpen: payload.isOpen,
      };
    case Constants.OPEN_SPACE:
      return {
        ...state,
        pages: payload.pages,
        activePage: payload.pages[0],
      };
    case Constants.CLOSE_SPACE:
      return initialState;
    case Constants.ADD_PAGE:
      return {
        ...state,
        pages: [...state.pages, payload.page],
        activePage: payload.page,
      };
    case Constants.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: payload.page,
      };
    default:
      return state;
  }
}

/** actions */
function setIsOpenAction(isOpen: boolean): SetIsOpenAction {
  return {
    type: Constants.SET_IS_OPEN,
    payload: { isOpen },
  };
}

function openSpaceAction(pages: Page[]): OpenSpaceAction {
  return {
    type: Constants.OPEN_SPACE,
    payload: { pages },
  };
}

function closeSpaceAction(): CloseSpaceAction {
  return {
    type: Constants.CLOSE_SPACE,
    payload: {},
  };
}

function addPageAction(page: Page): AddPageAction {
  return {
    type: Constants.ADD_PAGE,
    payload: { page },
  };
}

function setActivePageAction(page: Page): SetActivePageAction {
  return {
    type: Constants.SET_ACTIVE_PAGE,
    payload: { page },
  };
}
