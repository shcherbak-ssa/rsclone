import React from 'react';

type AppComponentProps = {
  id: number,
  email: string,
};

export function AppComponent({id, email}: AppComponentProps) {
  return (
    <div className="app">{id + email}</div>
  );
}
