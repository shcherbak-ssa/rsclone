import React from 'react';
import { ShortcutsService } from '../services/shortcuts.service';

export type SpacesMessageComponentProps = {
  spacesLanguage: any,
  addSpaceShortcutKeys: string,
};

export function SpacesMessageComponent({
  spacesLanguage, addSpaceShortcutKeys,
}: SpacesMessageComponentProps) {
  const {buttonValue, message} = spacesLanguage;

  function getMessageLabel(label: string) {
    return <span className="spaces-message-label">{label}</span>
  }
  
  return (
    <div className="spaces-message">
      {message[0]}
      {getMessageLabel(buttonValue)}
      {message[1]}
      {getMessageLabel(ShortcutsService.transformShortcutKeys(addSpaceShortcutKeys))}
      {message[2]}
    </div>
  );
}
