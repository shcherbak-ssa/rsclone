import { ActionIconComponentProps, ActionIconProps } from "../components/action-icon.component";
import { ActionIconLabels } from "../constants/ui.constants";
import { actionIconData } from "../data/action-icon.data";

export type ActionIconPropsParameters = {
  icons: ActionIconLabels[];
  iconPayloads: {
    [key: string]: {
      clickHandler?: () => void;
      description: string;
    }
  };
};

const actionIconClickHandlers = {
  [ActionIconLabels.INFO]: () => {
    console.log('info');
  },
  [ActionIconLabels.LOGO]: () => {
    location.replace(location.origin);
  },
}

export function useActionIconProps(
  {icons, iconPayloads}: ActionIconPropsParameters
): ActionIconComponentProps[] {
  const actionIconComponentsProps: ActionIconComponentProps[] = icons.map((iconLabel) => {
    const isIconInIconPayloads = iconLabel in iconPayloads;

    const description = isIconInIconPayloads ? iconPayloads[iconLabel].description : '';

    const clickHandler = isIconInIconPayloads && iconPayloads[iconLabel].clickHandler
      ? iconPayloads[iconLabel].clickHandler : actionIconClickHandlers[iconLabel];
    
    const actionIconProps: ActionIconProps = actionIconData[iconLabel];
    const actionIconComponentProps: ActionIconComponentProps = {
      iconProps: actionIconProps,
      description,
      clickHandler,
    };

    return actionIconComponentProps;
  });

  return actionIconComponentsProps;
}
