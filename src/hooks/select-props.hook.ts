import { useState } from 'react';

import { LanguageParts } from '../../common/constants';
import { BaseSelectProps } from '../components/base';
import { SelectThemeComponentProps } from '../components/select-theme.component';
import { UserDataLabels } from '../constants';
import { UserDraftEvents } from '../constants/events.constants';
import { UpdatedDraftValue, userDraftController } from '../controllers/user-draft.controller';
import { ToolsService } from '../services/tools.service';
import { SelectItemType, SelectItemTheme } from '../types/select-item.types';
import { useLanguagePart } from './language-part.hook';

export type SelectPropsHookParameters = {
  initialItemLabel: string,
  dataLabel: UserDataLabels,
  items: SelectItemType[] | SelectItemTheme[],
};

export function useSelectProps({
  initialItemLabel, dataLabel, items
}: SelectPropsHookParameters): BaseSelectProps | SelectThemeComponentProps {
  const toolsService: ToolsService = new ToolsService();

  const [selectedItemLabel, setSelectedItemLabel] = useState(initialItemLabel);
  const userInputsLanguage = useLanguagePart(LanguageParts.USER_DRAFT);

  const selectProps: BaseSelectProps | SelectThemeComponentProps = {
    ...addingSimpleSelectProps(),
    selectedItemLabel,
    updateSelectedItem: (label: string) => {
      if (label === selectedItemLabel) return;
      
      const nextSelectedItemLabel = toolsService.getSelectedItem(items, label).label;
      const updatedDraftValue: UpdatedDraftValue = {
        value: nextSelectedItemLabel,
        dataLabel,
      };

      userDraftController.emit(UserDraftEvents.UPDATE_VALUE, updatedDraftValue);
      setSelectedItemLabel(nextSelectedItemLabel);
    },
  };

  function addingSimpleSelectProps(): any {
    if (dataLabel === UserDataLabels.THEME) {
      return {
        items: addLanguageSelectThemeDescriptions(),
      };
    }

    const updatedItemsValuesByLanguage: SelectItemType[] = addLanguageSelectItemValues();
    const selectedItemValue = toolsService
      .getSelectedItem(updatedItemsValuesByLanguage, selectedItemLabel);

    return {
      items: updatedItemsValuesByLanguage,
      placeholder: userInputsLanguage[dataLabel].placeholder,
      selectedItemValue: (selectedItemValue as SelectItemType).value,
    };
  }

  function addLanguageSelectItemValues(): SelectItemType[] {
    return (items as SelectItemType[]).map(({label}) => {
      return {
        value: userInputsLanguage[dataLabel].items[label],
        label,
      };
    });
  }

  function addLanguageSelectThemeDescriptions(): SelectItemTheme[] {
    return (items as SelectItemTheme[]).map(({label, image}) => {
      return {
        description: userInputsLanguage[dataLabel][label],
        label,
        image
      };
    });
  }

  return selectProps;
}
