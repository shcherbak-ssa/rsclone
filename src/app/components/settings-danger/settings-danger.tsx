import React from 'react';
import './settings-danger.scss';

import { AppEvents, ButtonTypes, UserEvents } from '../../constants';
import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAction, SettingsActionProps } from '../../containers/settings-action';
import { PopupProps } from '../../containers/popup';
import { popupController } from '../../controllers/popup.controller';
import { userController } from '../../controllers/user.controller';
import { DeleteUserService } from '../../../services/delete-user.service';

export function SettingsDanger() {
  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'Danger Zone',
  };

  const deleteAccountPopupProps: PopupProps = {
    title: 'Delete account',
    body: <DeleteAccountPopupBody />,
    confirmButtonProps: {
      type: ButtonTypes.DANGER,
      value: 'Delete',
      clickHandler: () => {
        userController.emit(UserEvents.DELETE_ACCOUNT, (isDeleted) => {
          if (isDeleted) {
            new DeleteUserService().deleteFromLocal();
          } else {
            console.log('deleting error');
            popupController.emit(AppEvents.CLOSE_POPUP);
          }
        });
      },
    },
  };

  const settingsActionProps: SettingsActionProps = {
    title: 'Delete account',
    description: `By deleting your personal account, you delete all associated data. Think before acting, there's no turning back!`,
    buttonProps: {
      type: ButtonTypes.DANGER,
      value: 'Delete',
      clickHandler: () => {
        popupController.emit(AppEvents.SHOW_POPUP, deleteAccountPopupProps);
      },
    },
  };

  return (
    <SettingsSection {...settingsSectionProps}>
      <SettingsAction {...settingsActionProps} />
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
