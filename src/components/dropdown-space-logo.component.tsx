import React, { useEffect, useState } from 'react';

import { DropdownItemSpaceLogoComponent, DropdownItemSpaceLogoComponentProps } from './dropdown-item-space-logo.component';
import { spacesEmojis } from '../data/spaces.data';
import { ToolsService } from '../services/tools.service';

const DRAW_ITEMS_TIMEOUT: number = 100;
const DRAW_ITEMS_COUNT: number = 50;

export type DropdownSpaceLogoComponentProps = {
  selectSpaceLogo: Function,
};

export function DropdownSpaceLogoComponent({
  selectSpaceLogo,
}: DropdownSpaceLogoComponentProps) {
  const [spaceLogoItems, setSpaceLogoItems] = useState([]);

  useEffect(() => {
    let timeout: any;

    if (spaceLogoItems.length <= spacesEmojis.length) {
      timeout = setTimeout(drawItems, DRAW_ITEMS_TIMEOUT);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [spaceLogoItems]);

  function drawItems() {
    const toolsService: ToolsService = new ToolsService();
    const nextItems = toolsService.getElements(spacesEmojis, spaceLogoItems.length, DRAW_ITEMS_COUNT);
    setSpaceLogoItems([...spaceLogoItems, ...nextItems]);
  }

  function drawSpaceLogoItems() {
    return spaceLogoItems.map((emoji, index) => {
      const spaceLogoDropdownItem: DropdownItemSpaceLogoComponentProps = {
        emoji,
        clickHandler: (selectedEmoji: string) => {
          selectSpaceLogo(selectedEmoji);
        },
      };

      return <DropdownItemSpaceLogoComponent key={index} {...spaceLogoDropdownItem}/>
    });
  }

  return (
    <div className="dropdown dropdown-space-logo" data-class="shadow">
      <div className="dropdown-arrow"></div>
      <div className="dropdown-space-logo-items">
        {drawSpaceLogoItems()}
      </div>
    </div>
  );
}
