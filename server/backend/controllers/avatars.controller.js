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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarsController = exports.AvatarsControllerActions = void 0;
const avatars_model_1 = require("../models/avatars.model");
const base_controller_1 = require("./base.controller");
const constants_1 = require("../../common/constants");
const users_model_1 = require("../models/users.model");
const constants_2 = require("../constants");
var AvatarsControllerActions;
(function (AvatarsControllerActions) {
    AvatarsControllerActions["GET_AVATAR"] = "get-avatar";
    AvatarsControllerActions["CREATE_AVATAR"] = "create-avatar";
    AvatarsControllerActions["UPDATE_AVATAR"] = "update-avatar";
    AvatarsControllerActions["DELETE_AVATAR"] = "delete-avatar";
})(AvatarsControllerActions = exports.AvatarsControllerActions || (exports.AvatarsControllerActions = {}));
;
class AvatarsController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.avatarsModel = new avatars_model_1.AvatarsModel();
        this.usersModel = new users_model_1.UsersModel();
    }
    runController(action, { userID, responseSender }, avatarFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userID)
                    throw this.unknowUserIDError();
                switch (action) {
                    case AvatarsControllerActions.GET_AVATAR:
                        return yield this.getAvatar(userID, responseSender);
                    case AvatarsControllerActions.CREATE_AVATAR:
                        return yield this.createAvatar(userID, avatarFile, responseSender);
                    case AvatarsControllerActions.UPDATE_AVATAR:
                        return yield this.updateAvatar(userID, avatarFile, responseSender);
                    case AvatarsControllerActions.DELETE_AVATAR:
                        return yield this.deleteAvatar(userID, responseSender);
                }
            }
            catch (error) {
                responseSender.sendErrorResponse(error);
            }
        });
    }
    getAvatar(userID, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAvatarFilename = yield this.avatarsModel.getAvatar(userID);
            responseSender.sendFile(constants_1.StatusCodes.SUCCESS, userAvatarFilename);
        });
    }
    createAvatar(userID, avatarFile, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const avatarFileType = yield this.avatarsModel.createAvatar(userID, avatarFile);
            yield this.updateUserAvatar(userID, avatarFileType);
            responseSender.sendSuccessJsonResponse({}, constants_1.StatusCodes.CREATED);
        });
    }
    updateAvatar(userID, avatarFile, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAvatarFileType = yield this.avatarsModel.updatedAvatar(userID, avatarFile);
            yield this.updateUserAvatar(userID, newAvatarFileType);
            responseSender.sendSuccessJsonResponse({});
        });
    }
    deleteAvatar(userID, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.avatarsModel.deleteAvatar(userID);
            yield this.updateUserAvatar(userID, '');
            responseSender.sendSuccessJsonResponse({});
        });
    }
    updateUserAvatar(userID, fileType) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAvatar = {
                [constants_2.UserDataLabels.AVATAR]: fileType,
            };
            yield this.usersModel.updateUser(userID, updatedAvatar);
        });
    }
}
exports.AvatarsController = AvatarsController;
