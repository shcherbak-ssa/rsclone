import React from 'react';
import './styles/auth.component.scss';

import { AssetsService } from "../services/assets.service";
import { ActionIconPropsHookParams, useActionIconProps } from '../hooks/action-icon-props.hook';
import { ActionIconLabels } from '../constants/ui.constants';
import { ActionIconComponent, ActionIconComponentProps } from './action-icon.component';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';

const LOGO_LOGIN_ICON: string = 'logo-login';

type AuthComponentProps = {
  children?: React.ReactNode;
};

export function AuthComponent({children}: AuthComponentProps) {
  const assetsService: AssetsService = new AssetsService();
  const logoIcon: string = assetsService.getIconUrl(LOGO_LOGIN_ICON);

  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const actionIconPropsParams: ActionIconPropsHookParams = {
    icons: [ActionIconLabels.INFO],
    iconPayloads: {
      [ActionIconLabels.INFO]: {
        description: authLanguage.actionIconDescription[ActionIconLabels.INFO],
      },
    },
  };

  const actionIconsProps: ActionIconComponentProps[] = useActionIconProps(actionIconPropsParams);

  function drawActionIcons() {
    return actionIconsProps.map((actionIconProps, index) => {
      return <ActionIconComponent key={index} {...actionIconProps} />
    });
  }

  return (
    <div className="auth">
      <div className="auth-content">
        <div className="auth-header">
          <img src={logoIcon} className="auth-logo" />
          GitBook Clone
        </div>
        <div className="auth-form-container" data-class="shadow">
          {children}
        </div>
      </div>
      <div className="auth-icons">
        {drawActionIcons()}
      </div>
    </div>
  );
}
