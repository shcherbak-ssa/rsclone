import React from 'react';
import classnames from 'classnames';
import { EditorBlock } from 'draft-js';
import './styles/page-node.component.scss';

import { PageNodeType } from '../../common/entities';

export type PageNodeComponentProps = {
  nodeType: PageNodeType,
};

export function PageNodeComponent(props: any) {
  const componentClassnames = classnames('page-node', props.blockProps.nodeType);

  return (
    <div className={componentClassnames}>
      <EditorBlock {...props}/>
    </div>
  );
}
