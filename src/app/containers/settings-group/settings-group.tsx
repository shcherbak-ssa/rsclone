import React from 'react';
import './settings-group.scss';

export type SettingsGroupProps = {
  title: string;
  children?: React.ReactNode,
};

export function SettingsGroup({title, children}: SettingsGroupProps) {
  return (
    <div className="settings-group">
      <div className="settings-group-title">{title.toUpperCase()}</div>
      {children}
    </div>
  );
}
