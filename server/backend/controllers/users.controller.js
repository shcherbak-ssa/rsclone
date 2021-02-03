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
exports.UsersController = exports.UsersControllerActions = void 0;
const base_controller_1 = require("./base.controller");
const user_validation_1 = require("../validation/user.validation");
const users_model_1 = require("../models/users.model");
const unique_model_1 = require("../models/unique.model");
const constants_1 = require("../constants");
const spaces_model_1 = require("../models/spaces.model");
var UsersControllerActions;
(function (UsersControllerActions) {
    UsersControllerActions["GET_USER"] = "get-user";
    UsersControllerActions["UPDATE_USER"] = "update-user";
    UsersControllerActions["DELETE_USER"] = "delete-user";
})(UsersControllerActions = exports.UsersControllerActions || (exports.UsersControllerActions = {}));
;
class UsersController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.validation = new user_validation_1.UserValidationImpl();
        this.usersModel = new users_model_1.UsersModel();
        this.uniqueModel = new unique_model_1.UniqueModel();
        this.spacesModel = new spaces_model_1.SpacesModel();
    }
    runController(action, { userID, body, responseSender }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userID)
                    throw this.unknowUserIDError();
                switch (action) {
                    case UsersControllerActions.GET_USER:
                        return yield this.getUser(userID, responseSender);
                    case UsersControllerActions.UPDATE_USER:
                        return yield this.updateUser(userID, body, responseSender);
                    case UsersControllerActions.DELETE_USER:
                        return yield this.deleteUser(userID, responseSender);
                }
            }
            catch (error) {
                responseSender.sendErrorResponse(error);
            }
        });
    }
    getUser(userID, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.getUser(userID);
            const spaces = yield this.spacesModel.getSpaces(userID);
            responseSender.sendSuccessJsonResponse({ user, spaces });
        });
    }
    updateUser(userID, updatedData, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(updatedData).length === constants_1.EMPTY_VALUE_LENGTH) {
                return responseSender.sendSuccessJsonResponse({});
            }
            updatedData = yield this.validation.validate(updatedData);
            yield this.checkExistingUserWithCurrentUsername(updatedData);
            yield this.checkExistingUserWithCurrentEmail(updatedData);
            updatedData = yield this.usersModel.updateUser(userID, updatedData);
            responseSender.sendSuccessJsonResponse(updatedData);
        });
    }
    deleteUser(userID, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.usersModel.deleteUser(userID);
            responseSender.sendSuccessJsonResponse(deleteResult);
        });
    }
    checkExistingUserWithCurrentUsername(updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.UserDataLabels.USERNAME in updatedData) {
                const username = updatedData[constants_1.UserDataLabels.USERNAME];
                yield this.uniqueModel.checkExistingUserWithCurrentUsername(username);
            }
        });
    }
    checkExistingUserWithCurrentEmail(updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.UserDataLabels.EMAIL in updatedData) {
                const email = updatedData[constants_1.UserDataLabels.EMAIL];
                yield this.uniqueModel.checkExistingUserWithCurrentEmail(email);
            }
        });
    }
}
exports.UsersController = UsersController;
