import React from 'react';
import './styles/avatar.component.scss';

import { DEFAULT_AVATAR_SIZE, SPACE_STRING } from '../constants';

export type AvatarComponentProps = {
  size?: number,
  avatarLink: string,
  userFullname: string,
};

export function AvatarComponent({
  size = DEFAULT_AVATAR_SIZE, avatarLink, userFullname,
}: AvatarComponentProps) {
  function setSizeStyles() {
    const sizeStyles = {
      width: size,
      height: size,
    };

    if (!!avatarLink) {
      return {
        backgroundImage: `url(${avatarLink})`,
        ...sizeStyles
      };
    }

    return sizeStyles
  }

  function transformUserName() {
    const [firstName, lastName] = userFullname.split(SPACE_STRING);
    const firstLetterOfFirstName = firstName[0];
    const firstLetterOfLastName = lastName ? lastName[0] : '';
    return `${firstLetterOfFirstName}${firstLetterOfLastName}`.toUpperCase();
  }

  if (avatarLink) {
    return <div className="avatar" style={setSizeStyles()}></div>;
  } else {
    return (
      <div className="avatar" style={setSizeStyles()} data-class="flex-center">
        {transformUserName()}
      </div>
    );
  }
}
