import React from 'react';

type PageHeaderComponentProps = {
  children?: React.ReactNode,
};

export function PageHeaderComponent({children}: PageHeaderComponentProps) {
  return <div className="page-header">{children}</div>;
}
