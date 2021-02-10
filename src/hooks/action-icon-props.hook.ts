import { ActionIconComponentProps, ActionIconProps } from "../components/action-icon.component";
import { EMPTY_STRING } from "../constants/strings.constants";
import { ActionIconLabels, DropdownNames } from "../constants/ui.constants";
import { actionIconData } from "../data/action-icon.data";
import { DropdownService } from "../services/dropdown.service";

export type ActionIconPropsHookParams = {
  icons: ActionIconLabels[],
  iconPayloads?: {
    [key: string]: {
      description?: string;
      clickHandler?: () => void;
      dropdownComponent?: (props: any) => JSX.Element | null,
    }
  },
  activeActionIconLabel?: string,
};

const actionIconClickHandlers = {
  [ActionIconLabels.INFO]: () => {
    DropdownService.openDropdown(DropdownNames.INFORMATION);
  },
  [ActionIconLabels.LOGO]: () => {
    location.replace(location.origin);
  },
}

export function useActionIconProps({
  icons, iconPayloads = {}, activeActionIconLabel,
}: ActionIconPropsHookParams): ActionIconComponentProps[] {
  const actionIconComponentsProps: ActionIconComponentProps[] = icons.map((iconLabel) => {
    let
      description = EMPTY_STRING,
      clickHandler = actionIconClickHandlers[iconLabel],
      dropdownComponent = null;

    if (iconLabel in iconPayloads) {
      const iconPayload = iconPayloads[iconLabel];

      description = iconPayload.description || description;
      clickHandler = iconPayload.clickHandler || clickHandler;
      dropdownComponent = iconPayload.dropdownComponent || dropdownComponent;
    }

    
    const actionIconProps: ActionIconProps = actionIconData[iconLabel];
    const actionIconComponentProps: ActionIconComponentProps = {
      iconProps: actionIconProps,
      description,
      clickHandler,
      label: iconLabel,
      dropdownComponent,
      ...getActiveActionIconLabel(),
    };

    return actionIconComponentProps;
  });

  function getActiveActionIconLabel(): any {
    return activeActionIconLabel !== undefined ? {activeActionIconLabel} : {};
  }

  return actionIconComponentsProps;
}
