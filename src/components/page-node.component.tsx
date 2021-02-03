import React from 'react';
import { EditorBlock } from 'draft-js';
import classnames from 'classnames';
import './styles/page-node.component.scss';

export function PageNodeComponent(props: any) {
  const componentClassnames = classnames('page-node', props.blockProps.nodeType);

  return (
    <div className={componentClassnames}>
      <EditorBlock {...props}/>
    </div>
  );
}
