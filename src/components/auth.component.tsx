import React from 'react';
import './styles/auth.component.scss';

import { Icon } from '@iconify/react';
import booksIcon from '@iconify/icons-wpf/books';

import { ActionIconPropsHookParams, useActionIconProps } from '../hooks/action-icon-props.hook';
import { ActionIconLabels } from '../constants/ui.constants';
import { ActionIconComponent, ActionIconComponentProps } from './action-icon.component';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';
import { InformationDropdownContainer } from '../containers/information-dropdown.container';

const LOGO_ICON_HEIGHT: number = 32;

type AuthComponentProps = {
  children?: React.ReactNode;
};

export function AuthComponent({children}: AuthComponentProps) {
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const logoIconProps = {
    icon: booksIcon,
    height: LOGO_ICON_HEIGHT,
    className: 'auth-logo',
  };

  const actionIconPropsParams: ActionIconPropsHookParams = {
    icons: [ActionIconLabels.INFO],
    iconPayloads: {
      [ActionIconLabels.INFO]: {
        description: authLanguage.actionIconDescription[ActionIconLabels.INFO],
        dropdownComponent: InformationDropdownContainer,
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
          <Icon {...logoIconProps}/>
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
