import React from 'react';
import './styles/spaces.component.scss';

type SpacesComponentProps = {
  children?: React.ReactNode,
};

export function SpacesComponent({children}: SpacesComponentProps) {
  return (
    <div className="spaces">{children}</div>
  );
}
