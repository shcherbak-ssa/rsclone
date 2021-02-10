import React from 'react';

export type SettingsSectionMessageComponentProps = {
  message: string,
};

export function SettingsSectionMessageComponent({
  message
}: SettingsSectionMessageComponentProps) {
  return (
    <div className="settings-section-message">
      {message}
    </div>
  );
}
