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

import { UpdatedPage } from '../../common/entities';
import { PageNodeComponent } from '../components/page-node.component';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { EditorBlockStyleType } from '../constants/ui.constants';
import { inlineEditorStyles } from '../data/editor.data';
import { PageInlineToolbarContainer, PageInlineToolbarContainerProps } from './page-inline-toolbar.container';

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

export type PageContentContainerProps = {
  activePageID: string,
  pageContent: string,
  color: string,
};

export function PageContentContainer({
  activePageID, pageContent, color,
}: PageContentContainerProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorProps: PluginEditorProps = {
    editorState,
    customStyleMap: inlineEditorStyles,
    plugins: [
      inlineToolbarPlugin,
    ],
    handleKeyCommand,
    blockRendererFn: blockRender,
    onChange: (state: EditorState) => {
      setEditorState(state);
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

  useEffect(() => {
    if (pageContent) {
      const contentState: ContentState = convertFromRaw(JSON.parse(pageContent));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [pageContent]);

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
