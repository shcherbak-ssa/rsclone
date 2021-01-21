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
import { SpacePopupContainer, SpacePopupContainerProps } from './popups/space-popup.container';
import { PopupService } from '../services/popup.service';
import { PopupNames } from '../constants/ui.constants';
import { SpaceContainerProps, SpaceContainer } from './space.container';
import { SpacesEvents } from '../constants/events.constants';
import { DeletePopupContainer, DeletePopupContainerProps } from './popups/delete-popup.container';
import { spacesController } from '../controllers/spaces.controller';

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

  const createSpacePopupProps: SpacePopupContainerProps = {
    popupName: PopupNames.CREATE_SPACE,
    spaceEvent: SpacesEvents.CREATE_SPACE,
  };

  const updateSpacePopupProps: SpacePopupContainerProps = {
    popupName: PopupNames.UPDATE_SPACE,
    spaceEvent: SpacesEvents.UPDATE_SPACE,
  };

  const deleteSpacePopupProps: DeletePopupContainerProps = {
    popupName: PopupNames.DELETE_SPACE,
    controller: spacesController,
    controllerEvent: SpacesEvents.DELETE_SPACE,
  };

  function drawSpaces() {
    if (spaces.length === EMPTY_VALUE_LENGTH) {
      const spacesMessageProps: SpacesMessageComponentProps = {
        spacesLanguage,
        addSpaceShortcutKeys,
      };

      return <SpacesMessageComponent {...spacesMessageProps}/>
    }

    const spaceContainers = spaces.map((space) => {
      const spaceContainerProps: SpaceContainerProps = {space};
      return <SpaceContainer key={space.id} {...spaceContainerProps}/>;
    });

    return <SpacesComponent>{spaceContainers}</SpacesComponent>;
  }

  function openCreateSpacePopup() {
    const popupService: PopupService = new PopupService();
    popupService.openPopup(PopupNames.CREATE_SPACE);
  }

  return (
    <HomepageContainer {...homepageContainerProps}>
      {drawSpaces()}
      <SpacePopupContainer {...createSpacePopupProps}/>
      <SpacePopupContainer {...updateSpacePopupProps}/>
      <DeletePopupContainer {...deleteSpacePopupProps}/>
    </HomepageContainer>
  );
}
