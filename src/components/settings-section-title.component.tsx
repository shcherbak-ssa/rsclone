import React from 'react';

type SettingsSectionTitleComponentProps = {
  title: string,
};

export function SettingsSectionTitleComponent({title}: SettingsSectionTitleComponentProps) {
  return <div className="settings-section-title">{title}</div>;
}
