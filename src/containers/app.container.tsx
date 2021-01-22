import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { MenuContainer } from './menu.container';
import { AppComponent } from '../components/app.component';
import { SidebarComponent } from '../components/sidebar.component';
import { useChangeTheme } from '../hooks/change-theme.hook';
import { SpacesContainer } from './spaces.container';
import { SettingsContainer } from './settings.container';
import { spacesEmojis } from '../data/spaces.data';
import { EmojiService } from '../services/emoji.service';
import { SpacesService } from '../services/spaces.service';
import { AppRoutePathnames } from '../constants';
import { SpacePageContainer } from './space-page.container';

export default function AppContainer() {
  useChangeTheme();

  useEffect(() => {
    loadSpacesEmojis();
  }, []);

  async function loadSpacesEmojis() {
    const emojiService: EmojiService = new EmojiService();
    const emojis: string[] = await emojiService.getAllEmojis();
    spacesEmojis.push(...emojis);

    const spacesService: SpacesService = new SpacesService();
    const randomEmoji: string = spacesService.getRandomEmoji();
    spacesService.updateSpaceLogo(randomEmoji);
  }

  return (
    <AppComponent>
      <SidebarComponent />
      <MenuContainer />
      <Switch>
        <Route path={AppRoutePathnames.ROOT} exact component={SpacesContainer}/>
        <Route path={AppRoutePathnames.SPACES} exact component={SpacesContainer}/>
        <Route path={AppRoutePathnames.SETTINGS} exact component={SettingsContainer}/>
        <Route path={AppRoutePathnames.SPACE_PAGE} exact component={SpacePageContainer}/>
      </Switch>
    </AppComponent>
  );
}
