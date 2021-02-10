import React from 'react';
import '../assets/styles/inline-toolbar.scss';

import { createBlockStyleButton, createInlineStyleButton } from '@draft-js-plugins/buttons';
import { InlineToolBarPlugin, Separator } from '@draft-js-plugins/inline-toolbar';

import { Icon } from '@iconify/react';
import formatBoldIcon from '@iconify/icons-mdi-light/format-bold';
import formatItalicIcon from '@iconify/icons-mdi-light/format-italic';
import formatUnderlineIcon from '@iconify/icons-mdi-light/format-underline';
import formatCodeIcon from '@iconify/icons-mdi-light/xml';
import formatHeader1Icon from '@iconify/icons-fluent/text-header-1-20-regular';
import formatHeader2Icon from '@iconify/icons-fluent/text-header-2-20-regular';
import formatHeader3Icon from '@iconify/icons-fluent/text-header-3-20-regular';
import formatBlockquoteIcon from '@iconify/icons-mdi-light/format-quote-close';

import { EditorBlockStyleType, EditorInlineStyleType } from '../constants/ui.constants';

const TOOLBAR_ICON_HEIGHT: number = 24;

const EditorInlineButtons = {
  Bold: createEditorInlineButton(EditorInlineStyleType.BOLD, formatBoldIcon),
  Italic: createEditorInlineButton(EditorInlineStyleType.ITALIC, formatItalicIcon),
  Underline: createEditorInlineButton(EditorInlineStyleType.UNDERLINE, formatUnderlineIcon),
  Code: createEditorInlineButton(EditorInlineStyleType.CODE, formatCodeIcon),
};

const EditorBlockButtons = {
  Header1: createEditorBlockButton(EditorBlockStyleType.HEADER_ONE, formatHeader1Icon),
  Header2: createEditorBlockButton(EditorBlockStyleType.HEADER_TWO, formatHeader2Icon),
  Header3: createEditorBlockButton(EditorBlockStyleType.HEADER_THREE, formatHeader3Icon),
  Blockquote: createEditorBlockButton(EditorBlockStyleType.BLOCKQUOTE, formatBlockquoteIcon),
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
            <EditorBlockButtons.Header1 {...externalProps}/>
            <EditorBlockButtons.Header2 {...externalProps}/>
            <EditorBlockButtons.Header3 {...externalProps}/>
            <Separator className="inline-toolbar-separator"/>
            <EditorBlockButtons.Blockquote {...externalProps} />
            <Separator className="inline-toolbar-separator"/>
            <EditorInlineButtons.Bold {...externalProps}/>
            <EditorInlineButtons.Italic {...externalProps} />
            <EditorInlineButtons.Underline {...externalProps} />
            <Separator className="inline-toolbar-separator"/>
            <EditorInlineButtons.Code {...externalProps}/>
          </>
        )
      }
    </InlineToolbar>
  );
}

function createEditorInlineButton(style: EditorInlineStyleType, icon: object) {
  return createInlineStyleButton({
    style,
    children: <Icon icon={icon} height={TOOLBAR_ICON_HEIGHT}/>,
  });
}

function createEditorBlockButton(blockType: EditorBlockStyleType, icon: object) {
  return createBlockStyleButton({
    blockType,
    children: <Icon icon={icon} height={TOOLBAR_ICON_HEIGHT}/>,
  });
}
