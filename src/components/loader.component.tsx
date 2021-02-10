import React from 'react';
import './styles/loader.component.scss';

export function LoaderComponent() {
  return (
    <div className="loader" data-class="flex-center">
      <div className="loader-spinner">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
}
