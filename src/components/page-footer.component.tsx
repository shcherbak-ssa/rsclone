import React from 'react';

type PageFooterComponentProps = {
  children?: React.ReactNode,
};

export function PageFooterComponent({children}: PageFooterComponentProps) {
  return <div className="page-footer">{children}</div>;
}
