import React from 'react';
import '../assets/styles/toolbar.scss';

import { Separator, StaticToolBarPlugin } from '@draft-js-plugins/static-toolbar';
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  createBlockStyleButton,
} from '@draft-js-plugins/buttons';

import { Icon } from '@iconify/react';
import formatHeader1Icon from '@iconify/icons-fluent/text-header-1-20-regular';
import formatHeader2Icon from '@iconify/icons-fluent/text-header-2-20-regular';
import formatHeader3Icon from '@iconify/icons-fluent/text-header-3-20-regular';

import { EditorBlockStyleType } from '../constants/ui.constants';

const TOOLBAR_ICON_HEIGHT: number = 18;

const EditorBlockButtons = {
  Header1: createEditorButton(EditorBlockStyleType.HEADER_ONE, formatHeader1Icon),
  Header2: createEditorButton(EditorBlockStyleType.HEADER_TWO, formatHeader2Icon),
  Header3: createEditorButton(EditorBlockStyleType.HEADER_THREE, formatHeader3Icon),
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
            <Separator className="toolbar-separator"/>
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <Separator className="toolbar-separator"/>
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
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
