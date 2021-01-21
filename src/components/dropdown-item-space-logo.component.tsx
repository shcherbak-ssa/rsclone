import React from 'react';

export type DropdownItemSpaceLogoComponentProps = {
  emoji: string,
  clickHandler: Function,
};

export function DropdownItemSpaceLogoComponent({
  emoji, clickHandler,
}: DropdownItemSpaceLogoComponentProps) {
  function handleClick() {
    clickHandler(emoji);
  }

  return (
    <div className="dropdown-item-space-logo" data-class="click" onClick={handleClick}>
      {emoji}
    </div>
  );
}
