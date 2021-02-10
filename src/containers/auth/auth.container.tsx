import React, { useEffect } from 'react';

import { Themes } from '../../../common/constants';
import { AuthComponent } from "../../components/auth.component";
import { DocumentBodyService } from '../../services/document-body.service';

type AuthContainerProps = {
  children?: React.ReactNode,
};

export function AuthContainer({children}: AuthContainerProps) {
  useEffect(() => {
    new DocumentBodyService().addClass(Themes.ORIGINAL);
  }, []);

  return <AuthComponent>{children}</AuthComponent>;
}
