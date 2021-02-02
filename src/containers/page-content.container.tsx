import React, { useEffect, useState } from 'react';

import Editor, { PluginEditorProps } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';

import {
  ContentBlock,
  ContentState,
  convertFromRaw,
  convertToRaw,
  DraftHandleValue,
  EditorState,
  RichUtils,
} from 'draft-js';

import '../assets/styles/inline-toolbar.scss';

import { PageNodeType, UpdatedPage } from '../../common/entities';
import { PageNodeComponent } from '../components/page-node.component';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { UserDataLabels } from '../../backend/constants';
import { inlineEditorStyles } from '../data/editor.data';
import { PageInlineToolbarContainer, PageInlineToolbarContainerProps } from './page-inline-toolbar.container';
import { EditorInlineStyleType } from '../constants/ui.constants';

const inlineToolbarPlugin = createInlineToolbarPlugin();

export type PageContentContainerProps = {
  activePageID: string,
  pageNodes: string,
  color: string,
};

export function PageContentContainer({
  activePageID, pageNodes, color,
}: PageContentContainerProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorProps: PluginEditorProps = {
    editorState,
    customStyleMap: inlineEditorStyles,
    plugins: [
      inlineToolbarPlugin,
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

  useEffect(() => {
    if (pageNodes) {
      const contentState: ContentState = convertFromRaw(JSON.parse(pageNodes));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [pageNodes]);

  function nodeRender(contentBlock: ContentBlock) {
    const type: string = contentBlock.getType();

    return {
      component: PageNodeComponent,
      editable: true,
      props: {
        nodeType: type in PageNodeType ? type : PageNodeType.PARAGRAPH,
      },
    };
  }

  function handleKeyCommand(command: string, state: EditorState): DraftHandleValue {
    console.log(command);
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
