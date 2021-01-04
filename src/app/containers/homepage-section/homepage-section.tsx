import React from 'react';
import { Base, BaseButtonProps } from '../../components/base';
import './homepage-section.scss';

export type HomepageSectionProps = {
  title: string,
  buttonProps?: BaseButtonProps,
  children?: React.ReactNode,
};

export function HomepageSection({
  title, buttonProps, children,
}: HomepageSectionProps) {
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
