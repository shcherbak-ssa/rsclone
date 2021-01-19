import React from 'react';

type SpaceSettingsDataComponentProps = {
  children?: React.ReactNode,
};

export function SpaceSettingsDataComponent({children}: SpaceSettingsDataComponentProps) {  
  return (
    <div className="space-settings-data">{children}</div>
  );
}
