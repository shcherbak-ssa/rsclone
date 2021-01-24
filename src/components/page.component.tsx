import React from 'react';
import './styles/page.component.scss';

type PageComponentProps = {
  children?: React.ReactNode,
};

export function PageComponent({children}: PageComponentProps) {
  return (
    <div className="page">{children}</div>
  );
}
