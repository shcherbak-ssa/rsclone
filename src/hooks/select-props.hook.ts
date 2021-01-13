import { useState } from 'react';

import { LanguageParts } from '../../common/constants';
import { BaseSelectProps } from '../components/base';
import { SelectItemType } from '../components/base/select-item.component';
import { UserDataLabels } from '../constants';
import { ToolsService } from '../services/tools.service';
import { useLanguagePart } from './language-part.hook';

export type SelectPropsHookParameters = {
  initialItem: SelectItemType,
  dataLabel: UserDataLabels,
  items: SelectItemType[],
};

export function useSelectProps(
  {initialItem, dataLabel, items}: SelectPropsHookParameters
): BaseSelectProps {
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const userInputsLanguage = useLanguagePart(LanguageParts.USER_INPUTS);

  const selectProps: BaseSelectProps = {
    placeholder: userInputsLanguage[dataLabel].placeholder,
    selected: selectedItem,
    items,
    updateSelectedItem: (label: string) => {
      if (label === selectedItem.label) return;
      
      const toolsService: ToolsService = new ToolsService();
      setSelectedItem(toolsService.getSelectedValue(items, label));
    },
  };

  return selectProps;
}
