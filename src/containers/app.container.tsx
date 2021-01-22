import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MenuContainer } from './menu.container';
import { AppComponent, AppComponentProps } from '../components/app.component';
import { SidebarComponent } from '../components/sidebar.component';
import { useChangeTheme } from '../hooks/change-theme.hook';
import { SpacesContainer } from './spaces.container';
import { SettingsContainer } from './settings.container';
import { AppRoutePathnames, Stores } from '../constants';
import { SpacePageContainer } from './space-page.container';
import { storeSelectorsService } from '../services/store-selectors.service';
import { SpaceSidebarContainer } from './space-sidebar.container';

export default function AppContainer() {
  useChangeTheme();

  const activeSpaceSelectors = storeSelectorsService.get(Stores.ACTIVE_SPACE_STORE);
  const isOpenSpacePage: boolean = useSelector(activeSpaceSelectors.getIsOpen());

  const appComponentProps: AppComponentProps = {
    isOpenSpacePage
  };

  function drawSpaceSidebar() {
    if (!isOpenSpacePage) return '';

    return <SpaceSidebarContainer />;
  }

  function drawMenu() {
    return isOpenSpacePage ? '' : <MenuContainer />;
  }

  return (
    <AppComponent {...appComponentProps}>
      <SidebarComponent>
        {drawSpaceSidebar()}
      </SidebarComponent>
      {drawMenu()}
      <Switch>
        <Route path={AppRoutePathnames.ROOT} exact component={SpacesContainer}/>
        <Route path={AppRoutePathnames.SPACES} exact component={SpacesContainer}/>
        <Route path={AppRoutePathnames.SETTINGS} exact component={SettingsContainer}/>

        <Route path={AppRoutePathnames.SPACE_PAGE} exact>
          <SpacePageContainer />
        </Route>
      </Switch>
    </AppComponent>
  );
}
