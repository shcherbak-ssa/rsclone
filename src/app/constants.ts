const IS_ACTIVE_CLASSNAME: string = 'is-active';

const THEME_LOCALSTORAGE_LABEL: string = 'app-theme';

enum Theme {
  ORIGINAL = 'original-theme',
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
};

enum AppRoutes {
  ROOT = '/',
  SETTINGS = '/settings',
};

enum MenuItemLabels {
  SPACES = 'space',
  SETTINGS = 'settings',
};

enum AppEvents {
  CHANGE_MENU_ITEM = 'app-events/change-menu-item',
};

export {
  IS_ACTIVE_CLASSNAME,
  THEME_LOCALSTORAGE_LABEL,
  Theme,
  AppRoutes,
  MenuItemLabels,
  AppEvents,
};
