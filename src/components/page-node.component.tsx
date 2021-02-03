import React from 'react';
import { EditorBlock } from 'draft-js';
import classnames from 'classnames';
import './styles/page-node.component.scss';

import { EMPTY_STRING } from '../constants/strings.constants';

export function PageNodeComponent(props: any) {
  const {
    blockProps: {nodeType, currentSelectionBlockKey, toolbar},
    selection, block,
  } = props;

  const isBlockActive: boolean = selection.hasFocus && block.key === currentSelectionBlockKey;
  const componentClassnames = classnames('page-node', nodeType, {
    'is-block-active': isBlockActive,
  });

  function drawToolbar() {
    return isBlockActive ? toolbar : EMPTY_STRING;
  }

  return (
    <>
      <div className={componentClassnames}>
        <EditorBlock {...props}/>
      </div>
      {drawToolbar()}
    </>
  );
}
