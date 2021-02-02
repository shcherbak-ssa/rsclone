import React, { useEffect, useState } from 'react';
import {
  ContentBlock,
  ContentState,
  convertFromRaw,
  convertToRaw,
  DraftHandleValue,
  Editor,
  EditorProps,
  EditorState,
  RichUtils,
} from 'draft-js';

import { PageNodeType, UpdatedPage } from '../../common/entities';
import { PageNodeComponent } from '../components/page-node.component';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { UserDataLabels } from '../../backend/constants';

export type PageContentContainerProps = {
  activePageID: string,
  pageNodes: string,
};

export function PageContentContainer({activePageID, pageNodes}: PageContentContainerProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorProps: EditorProps = {
    editorState,
    handleKeyCommand,
    blockRendererFn: nodeRender,
    onChange: setEditorState,
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
    const updatedState = RichUtils.handleKeyCommand(state, command);

    if (updatedState) {
      setEditorState(updatedState);
      return 'handled'
    }

    return 'not-handled';
  }
  
  return <Editor {...editorProps}/>;
}
