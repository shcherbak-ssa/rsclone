import React from 'react';
import { createInlineStyleButton } from '@draft-js-plugins/buttons';

import { Icon } from '@iconify/react';
import formatBoldIcon from '@iconify/icons-mdi-light/format-bold';
import formatItalicIcon from '@iconify/icons-mdi-light/format-italic';
import formatUnderlineIcon from '@iconify/icons-mdi-light/format-underline';
import formatCodeIcon from '@iconify/icons-mdi-light/xml';

import { EditorInlineStyleType } from '../constants/ui.constants';

const ICON_HEIGHT: number = 24;

export const inlineEditorStyles = {
  [EditorInlineStyleType.CODE]: {
    margin: '0 1px',
    display: 'inline-block',
    padding: '3px 6px',
    fontSize: '85%',
    maxWidth: '100%',
    fontFamily: '"Source Code Pro", Consolas, Menlo, monospace',
    borderRadius: '3px',
    backgroundColor: 'var(--content-inline-code-background-color)',
  },
};

export const EditorButtons = {
  Bold: createEditorButton(EditorInlineStyleType.BOLD, formatBoldIcon),
  Italic: createEditorButton(EditorInlineStyleType.ITALIC, formatItalicIcon),
  Underline: createEditorButton(EditorInlineStyleType.UNDERLINE, formatUnderlineIcon),
  Code: createEditorButton(EditorInlineStyleType.CODE, formatCodeIcon),
};

function createEditorButton(style: EditorInlineStyleType, icon: object) {
  return createInlineStyleButton({
    style,
    children: <Icon icon={icon} height={ICON_HEIGHT}/>,
  });
}
