import React, { useEffect, useState } from 'react';

import Editor, { PluginEditorProps } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';

import {
  ContentBlock,
  ContentState,
  convertFromRaw,
  convertToRaw,
  DraftHandleValue,
  EditorState,
  RichUtils,
} from 'draft-js';

import { UpdatedPage } from '../../common/entities';
import { PageNodeComponent } from '../components/page-node.component';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { EditorBlockStyleType } from '../constants/ui.constants';
import { inlineEditorStyles } from '../data/editor.data';
import { PageInlineToolbarContainer, PageInlineToolbarContainerProps } from './page-inline-toolbar.container';
import { PageToolbarContainer, PageToolbarContainerProps } from './page-toolbar.container';
import { EMPTY_STRING } from '../constants/strings.constants';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: {
    toolbarStyles: {
      toolbar: 'inline-toolbar',
    },
    buttonStyles: {
      active: 'is-active',
      button: 'inline-toolbar-button',
    },
  },
});

const toolbarPlugin = createToolbarPlugin({
  theme: {
    toolbarStyles: {
      toolbar: 'toolbar',
    },
    buttonStyles: {
      active: 'is-active',
      button: 'toolbar-button',
      buttonWrapper: 'toolbar-wrapper',
    },
  },
});

export type PageContentContainerProps = {
  activePageID: string,
  pageContent: string,
  color: string,
};

export function PageContentContainer({
  activePageID, pageContent, color,
}: PageContentContainerProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentSelectionBlockKey, setCurrentSelectionBlockKey] = useState(EMPTY_STRING);

  const editorProps: PluginEditorProps = {
    editorState,
    customStyleMap: inlineEditorStyles,
    plugins: [
      inlineToolbarPlugin,
      toolbarPlugin,
    ],
    handleKeyCommand,
    blockRendererFn: blockRender,
    onChange: (state: EditorState) => {
      setEditorState(state);
    },
    onFocus: () => {
      setCurrentSelectionBlockKey(getStartKey());
    },
    onBlur: () => {
      const contentState: ContentState = editorState.getCurrentContent();
      const rowContent = convertToRaw(contentState);

      const updatedPage: UpdatedPage = {
        id: activePageID,
        updates: {
          [UserDataLabels.PAGE_CONTENT]: JSON.stringify(rowContent),
        },
      };

      activeSpaceController.emit(ActiveSpaceEvents.UPDATE_PAGE, updatedPage);
    },
  };

  const inlineToolbarProps: PageInlineToolbarContainerProps = {
    inlineToolbarPlugin,
  };

  const toolbarProps: PageToolbarContainerProps = {
    toolbarPlugin,
  };

  useEffect(() => {
    if (pageContent) {
      const contentState: ContentState = convertFromRaw(JSON.parse(pageContent));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
    
    setCurrentSelectionBlockKey(EMPTY_STRING);
  }, [pageContent]);

  useEffect(() => {
    const startKey: string = getStartKey();

    if (currentSelectionBlockKey !== EMPTY_STRING && startKey !== currentSelectionBlockKey) {
      setCurrentSelectionBlockKey(startKey);

      setEditorState(EditorState.forceSelection(
        editorState,
        editorState.getSelection(),
      ));
    }
  }, [getStartKey()]);

  function getStartKey(): string {
    return editorState.getSelection().getStartKey();
  }

  function blockRender(contentBlock: ContentBlock) {
    const type: string = contentBlock.getType();

    switch (type) {
      case EditorBlockStyleType.HEADER_ONE:
      case EditorBlockStyleType.HEADER_TWO:
      case EditorBlockStyleType.HEADER_THREE:
      case EditorBlockStyleType.BLOCKQUOTE:
        return getRenderComponent(type);
      default:
        return getRenderComponent(EditorBlockStyleType.PARAGRAPH);
    }
  }

  function getRenderComponent(nodeType: EditorBlockStyleType) {
    return {
      component: PageNodeComponent,
      editable: true,
      props: {
        nodeType,
        currentSelectionBlockKey,
        toolbar: <PageToolbarContainer {...toolbarProps}/>,
      },
    };
  }

  function handleKeyCommand(command: string, state: EditorState): DraftHandleValue {
    const updatedState = RichUtils.handleKeyCommand(state, command);

    if (updatedState) {
      setEditorState(updatedState);
      return 'handled';
    }

    return 'not-handled';
  }
  
  return (
    <>
      <Editor {...editorProps}/>
      <PageInlineToolbarContainer {...inlineToolbarProps}/>
    </>
  );
}
