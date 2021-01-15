import React from 'react';

import { AppComponent } from '../components/app.component';
import { useChangeTheme } from '../hooks/change-theme.hook';

export default function AppContainer() {
  useChangeTheme();

  return <AppComponent />;
}
