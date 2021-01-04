import React from 'react';
import { useSelector } from 'react-redux';
import { storeSelectors } from '../../store';
import './avatar.scss';

export function Avatar() {
  const user = useSelector(storeSelectors.user.get());

  function transformUserName() {
    const [firstName, lastName] = user.name.split(' ');
    const firstLetterOfFirstName = firstName[0];
    const firstLetterOfLastName = lastName[0];
    return `${firstLetterOfFirstName}${firstLetterOfLastName}`.toUpperCase();
  }

  if (user.avatar) {
    return <div className="avatar"></div>;
  } else {
    return (
      <div className="avatar" data-class="flex-center">
        {transformUserName()}
      </div>
    );
  }
}
