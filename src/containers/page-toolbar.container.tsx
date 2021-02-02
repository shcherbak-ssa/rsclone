import React from 'react';
import '../assets/styles/toolbar.scss';

import { Separator, StaticToolBarPlugin } from '@draft-js-plugins/static-toolbar';

export type PageToolbarContainerProps = {
  toolbarPlugin: StaticToolBarPlugin,
};

export function PageToolbarContainer({toolbarPlugin}: PageToolbarContainerProps) {
  const { Toolbar } = toolbarPlugin;

  return <Toolbar />;
}
