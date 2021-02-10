import React, { useEffect, useRef } from 'react';
import './styles/page.component.scss';

type PageComponentProps = {
  children?: React.ReactNode,
};

export function PageComponent({children}: PageComponentProps) {
  const page = useRef(null);

  useEffect(() => {
    if (page && page.current) {
      page.current.scrollIntoView();
    }
  });

  return (
    <div className="page" ref={page}>{children}</div>
  );
}
