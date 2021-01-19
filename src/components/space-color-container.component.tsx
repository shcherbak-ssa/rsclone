import React from 'react';
import './styles/space-color-container.component.scss';

type SpaceColorContainerComponentProps = {
  children?: React.ReactNode,
};

export function SpaceColorContainerComponent({children}: SpaceColorContainerComponentProps) {
  return <div className="space-color-container">{children}</div>;
}
