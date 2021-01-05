import React from 'react';
import { useSelector } from 'react-redux';
import { storeSelectors } from '../../store';
import './avatar.scss';

const DEFAULT_AVATAR_SIZE: number = 46;

type AvatarProps = {
  size?: number,
};

export function Avatar({size = DEFAULT_AVATAR_SIZE}: AvatarProps) {
  const user = useSelector(storeSelectors.user.get());

  function setSizeStyles() {
    return {
      width: size,
      height: size,
    };
  }

  function transformUserName() {
    const [firstName, lastName] = user.name.split(' ');
    const firstLetterOfFirstName = firstName[0];
    const firstLetterOfLastName = lastName[0];
    return `${firstLetterOfFirstName}${firstLetterOfLastName}`.toUpperCase();
  }

  if (user.avatar) {
    return <div className="avatar" style={setSizeStyles()}></div>;
  } else {
    return (
      <div className="avatar" style={setSizeStyles()} data-class="flex-center">
        {transformUserName()}
      </div>
    );
  }
}
