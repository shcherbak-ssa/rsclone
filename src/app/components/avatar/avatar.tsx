import React from 'react';
import { useSelector } from 'react-redux';
import { AssetsService } from '../../../services/assets.service';
import { storeSelectors } from '../../store';
import './avatar.scss';

const DEFAULT_AVATAR_SIZE: number = 46;

type AvatarProps = {
  size?: number,
  avatarArrayBuffer?: string,
};

export function Avatar({size = DEFAULT_AVATAR_SIZE, avatarArrayBuffer}: AvatarProps) {
  const {name, avatar} = useSelector(storeSelectors.user.get());
  const assetsService = new AssetsService();

  function setSizeStyles(imageUrl?: string) {
    const sizeStyles = {
      width: size,
      height: size,
    };

    if (imageUrl) {
      return {
        backgroundImage: `url(${imageUrl})`,
        ...sizeStyles
      };
    }

    return sizeStyles
  }

  function transformUserName() {
    const [firstName, lastName] = name.split(' ');
    const firstLetterOfFirstName = firstName[0];
    const firstLetterOfLastName = lastName ? lastName[0] : '';
    return `${firstLetterOfFirstName}${firstLetterOfLastName}`.toUpperCase();
  }

  if (avatar) {
    const imageUrl = assetsService.getAvatarImageUrl(avatar);
    return <div className="avatar" style={setSizeStyles(imageUrl)}></div>;
  } else if (avatarArrayBuffer) {
    return <div className="avatar" style={setSizeStyles(avatarArrayBuffer)}></div>;
  } else {
    return (
      <div className="avatar" style={setSizeStyles()} data-class="flex-center">
        {transformUserName()}
      </div>
    );
  }
}
