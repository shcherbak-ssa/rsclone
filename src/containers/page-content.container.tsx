import React, { useState } from 'react';
import {
  ContentBlock,
  DraftHandleValue,
  Editor,
  EditorProps,
  EditorState,
  RichUtils,
} from 'draft-js';

import { PageNode, PageNodeType } from '../../common/entities';
import { PageNodeComponent } from '../components/page-node.component';

export type PageContentContainerProps = {
  pageNodes: PageNode[],
};

export function PageContentContainer({pageNodes}: PageContentContainerProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorProps: EditorProps = {
    editorState,
    handleKeyCommand,
    blockRendererFn: nodeRender,
    onChange: setEditorState,
  };

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
