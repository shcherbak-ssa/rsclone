import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MenuContainer } from './menu.container';
import { AppComponent, AppComponentProps } from '../components/app.component';
import { SidebarComponent } from '../components/sidebar.component';
import { useChangeTheme } from '../hooks/change-theme.hook';
import { SpacesContainer } from './spaces.container';
import { SettingsContainer } from './settings.container';
import { AppRoutePathnames, Stores } from '../constants';
import { SpacePageContainer, SpacePageContainerProps } from './space-page.container';
import { storeSelectorsService } from '../services/store-selectors.service';
import { SpaceSidebarContainer, SpaceSidebarContainerProps } from './space-sidebar.container';
import { SpaceSidebarFrameComponent, SpaceSidebarFrameComponentProps } from '../components/space-sidebar-frame.component';
import { ActionIconLabels } from '../constants/ui.constants';
import { SpacePageSettingsContainer } from './space-page-settings.container';
import { EMPTY_STRING } from '../constants/strings.constants';

export default function AppContainer() {
  useChangeTheme();

  const [activeSpaceSidebarActionIcon, setActiveSpaceSidebarActionIcon] = useState(EMPTY_STRING);

  const activeSpaceSelectors = storeSelectorsService.get(Stores.ACTIVE_SPACE_STORE);
  const isSpacePageOpen: boolean = useSelector(activeSpaceSelectors.getIsOpen());

  const appComponentProps: AppComponentProps = {
    isSpacePageOpen,
  };

  const spacePageContainerProps: SpacePageContainerProps = {
    isSpacePageOpen,
    closeMenuHandler: () => {
      setActiveSpaceSidebarActionIcon(EMPTY_STRING);
    },
  };

  useEffect(() => {
    setActiveSpaceSidebarActionIcon(EMPTY_STRING);
  }, [isSpacePageOpen]);

  function drawSpaceSidebar() {
    if (!isSpacePageOpen) return EMPTY_STRING;

    const spaceSidebarProps: SpaceSidebarContainerProps = {
      activeSpaceSidebarActionIcon,
      setActiveSpaceSidebarActionIcon,
    };

    return <SpaceSidebarContainer {...spaceSidebarProps}/>;
  }

  function drawMenu() {
    return isSpacePageOpen ? EMPTY_STRING : <MenuContainer />;
  }

  function drawSpaceSidebarFrame() {
    if (!isSpacePageOpen) return EMPTY_STRING;

    const spaceSidebarFrameProps: SpaceSidebarFrameComponentProps = {
      activeSpaceSidebarActionIcon,
      setActiveSpaceSidebarActionIcon,
    };

    return (
      <SpaceSidebarFrameComponent {...spaceSidebarFrameProps}>
        {drawSpaceSidebarFrameContent()}
      </SpaceSidebarFrameComponent>
    );
  }

  function drawSpaceSidebarFrameContent() {
    switch (activeSpaceSidebarActionIcon) {
      case ActionIconLabels.SETTINGS:
        return <SpacePageSettingsContainer />;
      default:
        return <div></div>;
    }
  }

  return (
    <AppComponent {...appComponentProps}>
      <SidebarComponent>
        {drawSpaceSidebar()}
      </SidebarComponent>
      {drawMenu()}
      {drawSpaceSidebarFrame()}
      <Switch>
        <Route path={AppRoutePathnames.ROOT} exact component={SpacesContainer}/>
        <Route path={AppRoutePathnames.SPACES} component={SpacesContainer}/>
        <Route path={AppRoutePathnames.SETTINGS} component={SettingsContainer}/>
        <Route path={AppRoutePathnames.SPACE_PAGE}>
          <SpacePageContainer {...spacePageContainerProps}/>
        </Route>
      </Switch>
    </AppComponent>
  );
}
