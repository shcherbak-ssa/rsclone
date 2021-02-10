import React from 'react';
import './styles/space-settings-data.component.scss';

type SpaceSettingsDataComponentProps = {
  children?: React.ReactNode,
};

export function SpaceSettingsDataComponent({children}: SpaceSettingsDataComponentProps) {  
  return (
    <div className="space-settings-data">{children}</div>
  );
}
