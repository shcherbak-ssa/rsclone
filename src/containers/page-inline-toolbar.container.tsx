import React from 'react';
import '../assets/styles/inline-toolbar.scss';

import { createInlineStyleButton } from '@draft-js-plugins/buttons';
import { Separator, InlineToolBarPlugin } from '@draft-js-plugins/inline-toolbar';

import { Icon } from '@iconify/react';
import formatBoldIcon from '@iconify/icons-mdi-light/format-bold';
import formatItalicIcon from '@iconify/icons-mdi-light/format-italic';
import formatUnderlineIcon from '@iconify/icons-mdi-light/format-underline';
import formatCodeIcon from '@iconify/icons-mdi-light/xml';

import { EditorInlineStyleType } from '../constants/ui.constants';

const ICON_HEIGHT: number = 24;

const EditorButtons = {
  Bold: createEditorButton(EditorInlineStyleType.BOLD, formatBoldIcon),
  Italic: createEditorButton(EditorInlineStyleType.ITALIC, formatItalicIcon),
  Underline: createEditorButton(EditorInlineStyleType.UNDERLINE, formatUnderlineIcon),
  Code: createEditorButton(EditorInlineStyleType.CODE, formatCodeIcon),
};

export type PageInlineToolbarContainerProps = {
  inlineToolbarPlugin: InlineToolBarPlugin,
};

export function PageInlineToolbarContainer({
  inlineToolbarPlugin,
}: PageInlineToolbarContainerProps) {
  const { InlineToolbar } = inlineToolbarPlugin;

  return (
    <InlineToolbar>
      {
        (externalProps) => (
          <>
            <EditorButtons.Bold {...externalProps}/>
            <EditorButtons.Italic {...externalProps} />
            <EditorButtons.Underline {...externalProps} />
            <Separator className="inline-toolbar-separator"/>
            <EditorButtons.Code {...externalProps}/>
          </>
        )
      }
    </InlineToolbar>
  );
}

function createEditorButton(style: EditorInlineStyleType, icon: object) {
  return createInlineStyleButton({
    style,
    children: <Icon icon={icon} height={ICON_HEIGHT}/>,
  });
}
