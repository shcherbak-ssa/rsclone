import React from 'react';

type PopupMessageComponentProps = {
  children?: React.ReactNode,
};

export function PopupMessageComponent({children}: PopupMessageComponentProps) {
  return (
    <div className="popup-message">{children}</div>
  );
}
