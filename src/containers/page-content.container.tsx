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

import { PageNodeType, UpdatedPage } from '../../common/entities';
import { PageNodeComponent } from '../components/page-node.component';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { UserDataLabels } from '../../backend/constants';
import { inlineEditorStyles } from '../data/editor.data';
import { PageInlineToolbarContainer, PageInlineToolbarContainerProps } from './page-inline-toolbar.container';
import { PageToolbarContainer, PageToolbarContainerProps } from './page-toolbar.container';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const toolbarPlugin = createToolbarPlugin();

export type PageContentContainerProps = {
  activePageID: string,
  pageNodes: string,
  color: string,
};

export function PageContentContainer({
  activePageID, pageNodes, color,
}: PageContentContainerProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentSelectionBlockKey, setCurrentSelectionBlockKey] = useState(getStartKey());

  const editorProps: PluginEditorProps = {
    editorState,
    customStyleMap: inlineEditorStyles,
    plugins: [
      inlineToolbarPlugin,
      toolbarPlugin,
    ],
    handleKeyCommand,
    blockRendererFn: nodeRender,
    onChange: (state: EditorState) => {
      setEditorState(state);
    },
    onBlur: () => {
      const contentState: ContentState = editorState.getCurrentContent();
      const rowContent = convertToRaw(contentState);

      const updatedPage: UpdatedPage = {
        id: activePageID,
        updates: {
          [UserDataLabels.PAGE_NODES]: JSON.stringify(rowContent),
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
    if (pageNodes) {
      const contentState: ContentState = convertFromRaw(JSON.parse(pageNodes));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [pageNodes]);

  useEffect(() => {
    const startKey: string = getStartKey();

    if (startKey !== currentSelectionBlockKey) {
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

  function nodeRender(contentBlock: ContentBlock) {
    const type: string = contentBlock.getType();

    switch (type) {
      case PageNodeType.HEADER_ONE:
      case PageNodeType.HEADER_TWO:
      case PageNodeType.HEADER_THREE:
        return getRenderComponent(type);
      default:
        return getRenderComponent(PageNodeType.PARAGRAPH);
    }
  }

  function getRenderComponent(nodeType: PageNodeType) {
    return {
      component: PageNodeComponent,
      editable: true,
      props: {
        nodeType,
        currentSelectionBlockKey,
        toolbar: <PageToolbarContainer {...toolbarProps}/>
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
