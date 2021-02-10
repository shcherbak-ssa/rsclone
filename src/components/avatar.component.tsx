import React from 'react';
import classnames from 'classnames';
import './styles/avatar.component.scss';

import { DEFAULT_AVATAR_SIZE } from '../constants';
import { SPACE_STRING } from '../constants/strings.constants';

export type AvatarComponentProps = {
  size?: number,
  avatarUrl: string,
  userFullname: string,
  clickHandler?: Function,
};

export function AvatarComponent({
  size = DEFAULT_AVATAR_SIZE, avatarUrl, userFullname, clickHandler,
}: AvatarComponentProps) {
  const componentDataClassnames = classnames('flex-center', {
    'click': !!clickHandler
  });

  function setSizeStyles(): any {
    const sizeStyles = {
      width: size,
      height: size,
    };

    if (!!avatarUrl) {
      return {
        backgroundImage: `url(${avatarUrl})`,
        ...sizeStyles
      };
    }

    return sizeStyles
  }

  function handleClick() {
    if (clickHandler) {
      clickHandler();
    }
  }

  function transformUserName(): string {
    if (avatarUrl) return '';

    const [firstName, lastName] = userFullname.split(SPACE_STRING);
    const firstLetterOfFirstName = firstName[0];
    const firstLetterOfLastName = lastName ? lastName[0] : '';
    return `${firstLetterOfFirstName}${firstLetterOfLastName}`.toUpperCase();
  }

  return (
    <div
      className="avatar"
      data-class={componentDataClassnames}
      style={setSizeStyles()}
      onClick={handleClick}
    >
      {transformUserName()}
    </div>
  );
}
