import React from 'react';
import { useSelector } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';

import { Space } from '../../common/entities';
import { EMPTY_VALUE_LENGTH, HomepageSectionLabels, Stores } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';
import { SpacesComponent } from '../components/spaces.component';
import { SpacesMessageComponent, SpacesMessageComponentProps } from '../components/spaces-message.component';
import { useAppLanguage } from '../hooks/app-language.hook';
import { ShortcutsLabels } from '../../common/constants';
import { SpaceComponent, SpaceComponentProps } from '../components/space.component';
import { CreateSpacePopupContainer } from './popups/create-space-popup.container';
import { PopupService } from '../services/popup.service';
import { PopupNames } from '../constants/ui.constants';

export function SpacesContainer() {
  const spacesLanguage = useAppLanguage().homepage.spaces;

  const spacesSelectors = storeSelectorsService.get(Stores.SPACES_STORE);
  const spaces: Space[] = useSelector(spacesSelectors.getSpaces());

  const userSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const addSpaceShortcutKeys = useSelector(userSelectors.getShortcutKeys(ShortcutsLabels.ADD_SPACE));

  useHotkeys(addSpaceShortcutKeys, openCreateSpacePopup);

  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SPACES,
    buttonClickHandler: () => {
      openCreateSpacePopup();
    },
  };

  function drawSpaces() {
    if (spaces.length === EMPTY_VALUE_LENGTH) {
      const spacesMessageProps: SpacesMessageComponentProps = {
        spacesLanguage,
        addSpaceShortcutKeys,
      };

      return <SpacesMessageComponent {...spacesMessageProps}/>
    }

    const spaceComponents = spaces.map((space) => {
      const spaceComponentProps: SpaceComponentProps = {...space};
      return <SpaceComponent key={space.id} {...spaceComponentProps}/>;
    });

    return <SpacesComponent>{spaceComponents}</SpacesComponent>;
  }

  function openCreateSpacePopup() {
    const popupService: PopupService = new PopupService();
    popupService.openPopup(PopupNames.CREATE_SPACE);
  }

  return (
    <HomepageContainer {...homepageContainerProps}>
      {drawSpaces()}
      <CreateSpacePopupContainer />
    </HomepageContainer>
  );
}
