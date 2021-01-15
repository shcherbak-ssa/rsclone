import React from 'react';

type PopupTextComponentProps = {
  children?: React.ReactNode,
};

export function PopupTextComponent({children}: PopupTextComponentProps) {
  return (
    <div className="popup-text">{children}</div>
  );
}
