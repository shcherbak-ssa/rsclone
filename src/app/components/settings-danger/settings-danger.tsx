import React, { useState } from 'react';
import './settings-danger.scss';

import { ButtonTypes, UserEvents } from '../../constants';
import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAction, SettingsActionProps } from '../../containers/settings-action';
import { PopupProps, Popup } from '../../containers/popup';
import { userController } from '../../controllers/user.controller';
import { DeleteUserService } from '../../../services/delete-user.service';

export function SettingsDanger() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'Danger Zone',
  };

  const deleteAccountPopupProps: PopupProps = {
    title: 'Delete account',
    confirmButtonProps: {
      type: ButtonTypes.DANGER,
      value: 'Delete',
      clickHandler: () => {
        userController.emit(UserEvents.DELETE_ACCOUNT, (isDeleted) => {
          if (isDeleted) {
            new DeleteUserService().deleteFromLocal();
          } else {
            console.log('deleting error');
          }
        });
      },
    },
    closePopup: () => {
      setIsPopupOpen(false);
    },
  };

  const settingsActionProps: SettingsActionProps = {
    title: 'Delete account',
    description: `By deleting your personal account, you delete all associated data. Think before acting, there's no turning back!`,
    buttonProps: {
      type: ButtonTypes.DANGER,
      value: 'Delete',
      clickHandler: () => {
        setIsPopupOpen(true);
      },
    },
  };

  function showDeleteAccountPopup() {
    if (!isPopupOpen) return '';

    return (
      <Popup {...deleteAccountPopupProps}>
        <DeleteAccountPopupBody />
      </Popup>
    );
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <SettingsAction {...settingsActionProps} />
      {showDeleteAccountPopup()}
    </SettingsSection>
  );
}

function DeleteAccountPopupBody() {
  return (
    <div className="popup-body-text">
      By deleting your personal account, you delete all associated data.
      Think before acting, there's no turning back!
      Are you sure?
    </div>
  );
}
