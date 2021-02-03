import React from 'react';
import '../assets/styles/toolbar.scss';

import { StaticToolBarPlugin } from '@draft-js-plugins/static-toolbar';
import { createBlockStyleButton } from '@draft-js-plugins/buttons';

import { Icon } from '@iconify/react';
import formatHeader1Icon from '@iconify/icons-fluent/text-header-1-20-regular';
import formatHeader2Icon from '@iconify/icons-fluent/text-header-2-20-regular';
import formatHeader3Icon from '@iconify/icons-fluent/text-header-3-20-regular';
import formatBlockquoteIcon from '@iconify/icons-mdi-light/format-quote-close';

import { EditorBlockStyleType } from '../constants/ui.constants';
import { ToolbarSeparatorComponent } from '../components/toolbar-separator.component';

const TOOLBAR_ICON_HEIGHT: number = 20;

const EditorBlockButtons = {
  Header1: createEditorButton(EditorBlockStyleType.HEADER_ONE, formatHeader1Icon),
  Header2: createEditorButton(EditorBlockStyleType.HEADER_TWO, formatHeader2Icon),
  Header3: createEditorButton(EditorBlockStyleType.HEADER_THREE, formatHeader3Icon),
  Blockquote: createEditorButton(EditorBlockStyleType.BLOCKQUOTE, formatBlockquoteIcon),
};

export type PageToolbarContainerProps = {
  toolbarPlugin: StaticToolBarPlugin,
};

export function PageToolbarContainer({toolbarPlugin}: PageToolbarContainerProps) {
  const { Toolbar } = toolbarPlugin;

  return (
    <Toolbar>
      {
        (externalProps) => (
          <>
            <EditorBlockButtons.Header1 {...externalProps}/>
            <EditorBlockButtons.Header2 {...externalProps}/>
            <EditorBlockButtons.Header3 {...externalProps}/>
            <ToolbarSeparatorComponent />
            <EditorBlockButtons.Blockquote {...externalProps} />
          </>
        )
      }
    </Toolbar>
  );
}

function createEditorButton(blockType: EditorBlockStyleType, icon: object) {
  return createBlockStyleButton({
    blockType,
    children: <Icon icon={icon} height={TOOLBAR_ICON_HEIGHT}/>,
  });
}
