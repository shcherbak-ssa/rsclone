import React from 'react';
import { Theme } from './constants';

import { AppContainerProps, AppContainer } from './containers/app-container';

export default function AppComponent() {
  const appContainerProps: AppContainerProps = {
    theme: Theme.ORIGINAL,
  };
  
  return <AppContainer {...appContainerProps} />
}
