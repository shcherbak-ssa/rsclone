import { useState } from 'react';

import { LanguageParts } from '../../common/constants';
import { BaseSelectProps } from '../components/base';
import { SelectItemType } from '../components/base/select-item.component';
import { UserDataLabels } from '../constants';
import { UserInputsEvents } from '../constants/events.constants';
import { userInputsController } from '../controllers/user-inputs.controller';
import { ToolsService } from '../services/tools.service';
import { useLanguagePart } from './language-part.hook';

export type SelectPropsHookParameters = {
  initialItemLabel: string,
  dataLabel: UserDataLabels,
  items: SelectItemType[],
  userInputsEvent: UserInputsEvents,
};

export function useSelectProps(
  {initialItemLabel, dataLabel, items, userInputsEvent}: SelectPropsHookParameters
): BaseSelectProps {
  const toolsService: ToolsService = new ToolsService();

  const [selectedItemLabel, setSelectedItemLabel] = useState(initialItemLabel);
  const userInputsLanguage = useLanguagePart(LanguageParts.USER_INPUTS);

  const updatedItemsValuesByLanguage: SelectItemType[] = addLanguageToItemValues();

  const selectProps: BaseSelectProps = {
    placeholder: userInputsLanguage[dataLabel].placeholder,
    selectedItemValue: toolsService.getSelectedItem(updatedItemsValuesByLanguage, selectedItemLabel).value,
    selectedItemLabel,
    items: updatedItemsValuesByLanguage,
    updateSelectedItem: (label: string) => {
      if (label === selectedItemLabel) return;
      
      const nextSelectedItemLabel = toolsService.getSelectedItem(items, label).label;
      userInputsController.emit(userInputsEvent, nextSelectedItemLabel);
      setSelectedItemLabel(nextSelectedItemLabel);
    },
  };

  function addLanguageToItemValues(): SelectItemType[] {
    return items.map(({label}) => {
      return {
        value: userInputsLanguage[dataLabel].items[label],
        label,
      };
    });
  }

  return selectProps;
}
