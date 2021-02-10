import React from 'react';

type PageContentComponentProps = {
  children?: React.ReactNode,
};

export function PageContentComponent({children}: PageContentComponentProps) {
  return (
    <div className="page-content">{children}</div>
  );
}
