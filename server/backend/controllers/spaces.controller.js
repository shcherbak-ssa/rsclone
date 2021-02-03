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
exports.SpacesController = exports.SpacesControllerActions = void 0;
const constants_1 = require("../../common/constants");
const spaces_validation_1 = require("../validation/spaces.validation");
const base_controller_1 = require("./base.controller");
const spaces_model_1 = require("../models/spaces.model");
const space_pathname_service_1 = require("../services/space-pathname.service");
const constants_2 = require("../constants");
const pages_model_1 = require("../models/pages.model");
const page_access_service_1 = require("../services/page-access.service");
const page_data_1 = require("../data/page.data");
const users_collection_database_1 = require("../database/users-collection.database");
var SpacesControllerActions;
(function (SpacesControllerActions) {
    SpacesControllerActions["CREATE_SPACE"] = "create-space";
    SpacesControllerActions["UPDATE_SPACE"] = "update-space";
    SpacesControllerActions["DELETE_SPACE"] = "delete-space";
})(SpacesControllerActions = exports.SpacesControllerActions || (exports.SpacesControllerActions = {}));
;
class SpacesController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.validation = new spaces_validation_1.SpacesValidationImpl();
        this.spacesModel = new spaces_model_1.SpacesModel();
        this.spacePathname = new space_pathname_service_1.SpacePathnameService();
        this.pagesModel = new pages_model_1.PagesModel();
        this.userDatabase = users_collection_database_1.usersCollectionDatabase;
    }
    runController(action, { userID, body, responseSender }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userID)
                    throw this.unknowUserIDError();
                switch (action) {
                    case SpacesControllerActions.CREATE_SPACE:
                        return yield this.createSpace(userID, body, responseSender);
                    case SpacesControllerActions.UPDATE_SPACE:
                        return yield this.updatedSpace(userID, body, responseSender);
                    case SpacesControllerActions.DELETE_SPACE:
                        return yield this.deleteSpace(userID, body, responseSender);
                }
            }
            catch (error) {
                responseSender.sendErrorResponse(error);
            }
        });
    }
    createSpace(userID, newSpace, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            newSpace = yield this.validation.validateCreatedSpace(newSpace);
            const spacePathname = yield this.spacePathname.createSpacePathname(userID, newSpace.name);
            const createdSpace = Object.assign(Object.assign({}, newSpace), { [constants_2.UserDataLabels.SPACE_PATHNAME]: spacePathname, [constants_2.UserDataLabels.SPACE_PAGES]: [] });
            const space = yield this.spacesModel.createSpace(userID, createdSpace);
            const pageAccessCreator = new page_access_service_1.PageAccessService();
            pageAccessCreator.setUserID(userID);
            pageAccessCreator.setSpaceID(space.id);
            const pageAccess = pageAccessCreator.getPageAccess();
            const userLanguage = yield this.userDatabase.getUserLanguage(userID);
            const userInitialPage = page_data_1.initialPage[userLanguage];
            const createdInitialPage = yield this.pagesModel.createPage(pageAccess, userInitialPage);
            const updatedSpace = {
                id: space.id,
                updates: {
                    [constants_2.UserDataLabels.SPACE_PAGES]: [
                        createdInitialPage.id,
                    ],
                    [constants_2.UserDataLabels.SPACE_LAST_UPDATED]: +new Date(),
                },
            };
            yield this.spacesModel.updateSpace(userID, updatedSpace);
            space.pages.push(createdInitialPage.id);
            responseSender.sendSuccessJsonResponse(space, constants_1.StatusCodes.CREATED);
        });
    }
    updatedSpace(userID, updatedSpace, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            updatedSpace = yield this.validation.validateUpdatedSpace(updatedSpace);
            updatedSpace.updates[constants_2.UserDataLabels.SPACE_LAST_UPDATED] = +new Date();
            yield this.updateSpacePathname(userID, updatedSpace);
            yield this.spacesModel.updateSpace(userID, updatedSpace);
            responseSender.sendSuccessJsonResponse(updatedSpace);
        });
    }
    deleteSpace(userID, { deletedSpaceID }, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.spacesModel.deleteSpace(userID, deletedSpaceID);
            responseSender.sendSuccessJsonResponse({ deletedSpaceID });
        });
    }
    updateSpacePathname(userID, updatedSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_2.UserDataLabels.SPACE_NAME in updatedSpace.updates) {
                const newSpaceName = updatedSpace.updates[constants_2.UserDataLabels.SPACE_NAME];
                const newSpacePathname = yield this.spacePathname.createSpacePathname(userID, newSpaceName);
                updatedSpace.updates = Object.assign(Object.assign({}, updatedSpace.updates), { [constants_2.UserDataLabels.SPACE_PATHNAME]: newSpacePathname });
            }
        });
    }
}
exports.SpacesController = SpacesController;
