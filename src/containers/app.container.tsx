import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppComponent } from '../components/app.component';
import { useChangeTheme } from '../hooks/change-theme.hook';
import { AppRoutesService } from '../services/app-routes.service';
import { SpacesContainer } from './spaces.container';
import { SettingsContainer } from './settings.container';
import { spacesEmojis } from '../data/spaces.data';
import { EmojiService } from '../services/emoji.service';

export default function AppContainer() {
  // @TODO: fix change route after username updating
  const appRoutes: AppRoutesService = new AppRoutesService()
  useChangeTheme();

  useEffect(() => {
    loadSpacesEmojis();
  }, []);

  async function loadSpacesEmojis() {
    const emojiService: EmojiService = new EmojiService();
    spacesEmojis = await emojiService.getAllEmojis();
  }

  return (
    <AppComponent>
      <Switch>
        <Route path={appRoutes.getRootRoutePath()} exact component={SpacesContainer}/>
        <Route path={appRoutes.getSpacesRoutePath()} component={SpacesContainer}/>
        <Route path={appRoutes.getSettingsRoutePath()} component={SettingsContainer}/>
      </Switch>
    </AppComponent>
  );
}
