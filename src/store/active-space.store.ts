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
  SET_ACTIVE_PAGE_ID = 'active-space-store/set-active-page-id',
  UPDATE_PAGES = 'active-space-store/update-pages',
  DELETE_PAGE = 'active-space-store/delete-page',
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
    activePageID: string,
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

type SetActivePageIDAction = {
  type: Constants.SET_ACTIVE_PAGE_ID,
  payload: {
    activePageID: string,
  },
};

type UpdatePagesAction = {
  type: Constants.UPDATE_PAGES,
  payload: {
    pages: Page[],
  },
};

type DeletePageAction = {
  type: Constants.DELETE_PAGE,
  payload: {
    pages: Page[],
  },
};

type ActiveSpaceStoreAction =
  | AnyAction
  | SetIsOpenAction
  | OpenSpaceAction
  | CloseSpaceAction
  | AddPageAction
  | SetActivePageIDAction
  | UpdatePagesAction
  | DeletePageAction;

/** constants */
const activeSpaceStoreSelectors: StoreSelectors = {
  getIsOpen: () => {
    return (state: ActiveSpaceStoreSelector) => {
      return state[Stores.ACTIVE_SPACE_STORE].isOpen;
    };
  },

  getActivePage: () => {
    return (state: ActiveSpaceStoreSelector) => {
      const {pages, activePageID} = state[Stores.ACTIVE_SPACE_STORE];
      return pages.find((page) => page.id === activePageID);
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

  openSpace(pages: Page[], activePageID: string): void {
    reduxStore.dispatch(
      openSpaceAction(pages, activePageID)
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

  setActivePageID(activePageID: string): void {
    reduxStore.dispatch(
      setActivePageIDAction(activePageID)
    );
  }

  updatePages(pages: Page[]): void {
    reduxStore.dispatch(
      updatePagesAction(pages)
    );
  }

  deletePage(pages: Page[]): void {
    reduxStore.dispatch(
      deletePageAction(pages)
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
        activePageID: payload.activePageID || payload.pages[0].id,
      };
    case Constants.CLOSE_SPACE:
      return initialState;
    case Constants.ADD_PAGE:
      return {
        ...state,
        pages: [...state.pages, payload.page],
        activePageID: payload.page.id,
      };
    case Constants.SET_ACTIVE_PAGE_ID:
      return {
        ...state,
        activePageID: payload.activePageID,
      };
    case Constants.UPDATE_PAGES:
      return {
        ...state,
        pages: [...payload.pages],
      };
    case Constants.DELETE_PAGE:
      return {
        ...state,
        pages: [...payload.pages],
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

function openSpaceAction(pages: Page[], activePageID: string): OpenSpaceAction {
  return {
    type: Constants.OPEN_SPACE,
    payload: { pages, activePageID },
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

function setActivePageIDAction(activePageID: string): SetActivePageIDAction {
  return {
    type: Constants.SET_ACTIVE_PAGE_ID,
    payload: { activePageID },
  };
}

function updatePagesAction(pages: Page[]): UpdatePagesAction {
  return {
    type: Constants.UPDATE_PAGES,
    payload: { pages },
  };
}

function deletePageAction(pages: Page[]): DeletePageAction {
  return {
    type: Constants.DELETE_PAGE,
    payload: { pages },
  };
}
