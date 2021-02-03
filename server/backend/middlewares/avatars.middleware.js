"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarsMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const constants_1 = require("../../common/constants");
const user_files_service_1 = require("../services/user-files.service");
const response_sender_service_1 = require("../services/response-sender.service");
const data_1 = require("../../common/data");
const errors_service_1 = require("../services/errors.service");
const constants_2 = require("../constants");
class AvatarsMiddleware {
    constructor() {
        this.pathname = constants_1.MiddlewarePathnames.AVATARS;
        this.method = null;
        this.upload = multer_1.default({ storage: multer_1.default.memoryStorage() }).single(constants_1.AVATAR_LABEL);
        this.responseSender = new response_sender_service_1.ResponseSenderService();
    }
    handler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.upload(request, response, () => {
                try {
                    if (this.thisRequestMethodWithoutFile(request))
                        return next();
                    const { file } = request;
                    const fileType = user_files_service_1.UserFilesService.getFileType(file.mimetype);
                    this.checkAvatarFileType(fileType);
                    request.avatarFile = {
                        type: fileType,
                        buffer: file.buffer,
                    };
                    next();
                }
                catch (error) {
                    this.responseSender.setResponseObject(response);
                    this.responseSender.sendErrorResponse(error);
                }
            });
        });
    }
    thisRequestMethodWithoutFile({ method }) {
        return method === constants_1.RequestMethods.GET || method === constants_1.RequestMethods.DELETE;
    }
    checkAvatarFileType(fileType) {
        if (!this.isCorrectAvatarFileType(fileType)) {
            throw new errors_service_1.ClientError('Invalid avatar file type', constants_1.StatusCodes.BAD_REQUEST, {
                errorLabel: constants_1.ErrorLabels.INVALID_FILE_TYPE,
                dataLabel: constants_2.UserDataLabels.AVATAR,
                fileType,
            });
        }
    }
    isCorrectAvatarFileType(fileType) {
        return data_1.correctUserAvatarFileTypes.includes(fileType);
    }
}
exports.AvatarsMiddleware = AvatarsMiddleware;
