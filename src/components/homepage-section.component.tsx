import React from 'react';
import './styles/homepage-section.component.scss';

import { Base, BaseButtonProps } from './base';

export type HomepageSectionComponentProps = {
  title: string,
  buttonProps?: BaseButtonProps,
  children?: React.ReactNode,
};

export function HomepageSectionComponent({
  title, buttonProps, children
}: HomepageSectionComponentProps) {
  return (
    <div className="homepage-section">
      <div className="homepage-section-header">
        <div className="homepage-section-title">{title}</div>
        {buttonProps ? <Base.Button {...buttonProps} /> : ''}
      </div>
      <div className="homepage-section-content">{children}</div>
    </div>
  );
}
