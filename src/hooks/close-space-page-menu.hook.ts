import { Classnames } from '../constants/ui.constants';
import { DocumentBodyService } from '../services/document-body.service';

export function useCloseSpacePageMenu(closeMenuHandler: Function): () => void {
  return () => {
    const documentBodyService: DocumentBodyService = new DocumentBodyService();
    documentBodyService.removeClass(Classnames.IS_SPACE_PAGE_MENU_OPEN);

    closeMenuHandler();
  };
}
