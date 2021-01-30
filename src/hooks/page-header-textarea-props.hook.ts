import React, { useEffect, useState } from 'react';
import getKeycode from 'keycode';

import { EMPTY_VALUE_LENGTH, UserDataLabels } from '../constants';
import { ENTER_KEYCODE } from '../constants/strings.constants';
import { UpdatedPage } from '../../common/entities';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';

export type PageHeaderTextareaHookParams = {
  initialValue: string,
  limitValueLength: number,
  placeholder: string,
  dataLabel: UserDataLabels,
  activePageID: string,
  newPageTitle?: string,
};

export function usePageHeaderTextareaProps({
  initialValue, limitValueLength, placeholder, dataLabel, activePageID, newPageTitle,
}: PageHeaderTextareaHookParams): any {
  const [textareaValue, setTextareaValue] = useState(initialValue);

  useEffect(() => {
    setTextareaValue(initialValue);
  }, [initialValue]);

  const textareaProps = {
    placeholder,
    value: textareaValue,
    onKeyDown: (e: KeyboardEvent) => {
      const pressedKey: string = getKeycode(e);

      if (pressedKey === ENTER_KEYCODE) {
        e.preventDefault();
        e.target.blur();
      }
    },
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {value} = e.target;

      if (value.length <= limitValueLength) {
        setTextareaValue(value);
      }
    },
    onBlur: ({target: {value}}: React.FocusEvent<HTMLTextAreaElement>) => {
      if (value === initialValue) return;

      if (dataLabel === UserDataLabels.PAGE_TITLE && value.length === EMPTY_VALUE_LENGTH) {
        value = newPageTitle;
      }

      const updatedPage: UpdatedPage = {
        id: activePageID,
        updates: {
          [dataLabel]: value,
        },
      };

      activeSpaceController.emit(ActiveSpaceEvents.UPDATE_PAGE, updatedPage);
    },
  };

  return textareaProps;
}
