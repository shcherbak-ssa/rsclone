import React from 'react';
import { useSelector } from 'react-redux';

import { Space } from '../../common/entities';
import { EMPTY_VALUE_LENGTH, HomepageSectionLabels, Stores } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';
import { SpacesComponent } from '../components/spaces.component';
import { SpacesMessageComponent, SpacesMessageComponentProps } from '../components/spaces-message.component';
import { useAppLanguage } from '../hooks/app-language.hook';
import { ShortcutsLabels } from '../../common/constants';
import { SpaceComponent } from '../components/space.component';

export function SpacesContainer() {
  const spacesLanguage = useAppLanguage().homepage.spaces;

  const spacesSelectors = storeSelectorsService.get(Stores.SPACES_STORE);
  const spaces: Space[] = useSelector(spacesSelectors.getSpaces());

  const userSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const addSpaceShortcutKeys = useSelector(userSelectors.getShortcutKeys(ShortcutsLabels.ADD_SPACE));

  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SPACES,
    buttonClickHandler: () => {
      console.log('Add space');
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

    return <SpacesComponent />
  }

  return (
    <HomepageContainer {...homepageContainerProps}>
      {drawSpaces()}
    </HomepageContainer>
  );
}
