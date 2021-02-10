import React from 'react';
import './styles/settings-group.component.scss';

export type SettingsGroupComponentProps = {
  title: string;
  children?: React.ReactNode,
};

export function SettingsGroupComponent({title, children}: SettingsGroupComponentProps) {
  return (
    <div className="settings-group">
      <div className="settings-group-title">{title.toUpperCase()}</div>
      {children}
    </div>
  );
}
