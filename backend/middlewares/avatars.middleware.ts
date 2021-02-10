import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import {
  AVATAR_LABEL,
  ErrorLabels,
  MiddlewarePathnames,
  RequestMethods,
  StatusCodes,
} from '../../common/constants';
import { UserFilesService } from '../services/user-files.service';
import { BaseMiddleware } from './base.middleware';
import { ResponseSender } from '../types/services.types';
import { ResponseSenderService } from '../services/response-sender.service';
import { correctUserAvatarFileTypes } from '../../common/data';
import { ClientError } from '../services/errors.service';
import { UserDataLabels } from '../constants';

export class AvatarsMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.AVATARS;
  method: string | null = null;

  upload = multer({storage: multer.memoryStorage()}).single(AVATAR_LABEL);
  responseSender: ResponseSender = new ResponseSenderService();

  async handler(request: Request, response: Response, next: NextFunction): Promise<void> {
    this.upload(request, response, () => {
      try {
        if (this.thisRequestMethodWithoutFile(request)) return next();
  
        const {file} = request;
        const fileType: string = UserFilesService.getFileType(file.mimetype);
        this.checkAvatarFileType(fileType);

        request.avatarFile = {
          type: fileType,
          buffer: file.buffer,
        };

        next();
      } catch (error) {
        this.responseSender.setResponseObject(response);
        this.responseSender.sendErrorResponse(error);
      }
    });
  }

  thisRequestMethodWithoutFile({method}: Request): boolean {
    return method === RequestMethods.GET || method === RequestMethods.DELETE;
  }

  checkAvatarFileType(fileType: string): void {
    if (!this.isCorrectAvatarFileType(fileType)) {
      throw new ClientError(
        'Invalid avatar file type',
        StatusCodes.BAD_REQUEST,
        {
          errorLabel: ErrorLabels.INVALID_FILE_TYPE,
          dataLabel: UserDataLabels.AVATAR,
          fileType,
        },
      );
    }
  }

  isCorrectAvatarFileType(fileType: string): boolean {
    return correctUserAvatarFileTypes.includes(fileType);
  }
}
