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
  const componentClassnames = classnames('page-node', nodeType);

  function drawToolbar() {
    return selection.hasFocus && block.key === currentSelectionBlockKey ? toolbar : EMPTY_STRING;
  }

  return (
    <div className={componentClassnames}>
      <EditorBlock {...props}/>
      {drawToolbar()}
    </div>
  );
}
