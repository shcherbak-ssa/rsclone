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
exports.PagesController = exports.PagesControllerActions = void 0;
const base_controller_1 = require("./base.controller");
const errors_service_1 = require("../services/errors.service");
const pages_model_1 = require("../models/pages.model");
const page_access_service_1 = require("../services/page-access.service");
const constants_1 = require("../../common/constants");
const page_pathname_service_1 = require("../services/page-pathname.service");
const spaces_model_1 = require("../models/spaces.model");
const constants_2 = require("../constants");
const pages_validation_1 = require("../validation/pages.validation");
var PagesControllerActions;
(function (PagesControllerActions) {
    PagesControllerActions["GET_PAGES"] = "get-pages";
    PagesControllerActions["CREATE_PAGE"] = "create-page";
    PagesControllerActions["UPDATE_PAGE"] = "update-page";
    PagesControllerActions["DELETE_PAGE"] = "delete-page";
})(PagesControllerActions = exports.PagesControllerActions || (exports.PagesControllerActions = {}));
;
class PagesController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.pagesModel = new pages_model_1.PagesModel();
        this.pagePathname = new page_pathname_service_1.PagePathnameService();
        this.spacesModel = new spaces_model_1.SpacesModel();
        this.validation = new pages_validation_1.PagesValidationImpl();
    }
    runController(action, { userID, spaceID, body, responseSender }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userID)
                    throw this.unknowUserIDError();
                if (!spaceID) {
                    throw new errors_service_1.ServerError('Unknow space id', {
                        error: 'Some problems with code',
                    });
                }
                switch (action) {
                    case PagesControllerActions.GET_PAGES:
                        return yield this.getPages(userID, spaceID, responseSender);
                    case PagesControllerActions.CREATE_PAGE:
                        return yield this.createPage(userID, spaceID, body, responseSender);
                    case PagesControllerActions.UPDATE_PAGE:
                        return yield this.updatePage(userID, spaceID, body, responseSender);
                    case PagesControllerActions.DELETE_PAGE:
                        return yield this.deletePage(userID, spaceID, body, responseSender);
                }
            }
            catch (error) {
                responseSender.sendErrorResponse(error);
            }
        });
    }
    getPages(userID, spaceID, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const pages = yield this.pagesModel.getPages(userID, spaceID);
            responseSender.sendSuccessJsonResponse({ pages });
        });
    }
    createPage(userID, spaceID, { newPageTitle }, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageAccess = this.createPageAccess(userID, spaceID);
            const pagePathname = yield this.pagePathname.createPagePathname(userID, spaceID, newPageTitle);
            const newPage = this.createNewPage(newPageTitle, pagePathname);
            const createdNewPage = yield this.pagesModel.createPage(pageAccess, newPage);
            yield this.updateSpacePageIDs(userID, spaceID, (spacePageIDs) => {
                return [...spacePageIDs, createdNewPage.id];
            });
            responseSender.sendSuccessJsonResponse(Object.assign({}, createdNewPage), constants_1.StatusCodes.CREATED);
        });
    }
    updatePage(userID, spaceID, updatedPage, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            updatedPage = yield this.validation.validateUpdatedPage(updatedPage);
            const pageAccess = this.createPageAccess(userID, spaceID, updatedPage.id);
            if (constants_2.UserDataLabels.PAGE_TITLE in updatedPage.updates) {
                const updatedPageTitle = updatedPage.updates[constants_2.UserDataLabels.PAGE_TITLE];
                const updatedPagePathname = yield this.pagePathname.createPagePathname(userID, spaceID, updatedPageTitle);
                updatedPage.updates[constants_2.UserDataLabels.PAGE_PATHNAME] = updatedPagePathname;
            }
            yield this.pagesModel.updatePage(pageAccess, updatedPage);
            yield this.updateSpaceLastUpdated(userID, spaceID);
            responseSender.sendSuccessJsonResponse(updatedPage);
        });
    }
    deletePage(userID, spaceID, { deletePageID }, responseSender) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageAccess = this.createPageAccess(userID, spaceID, deletePageID);
            yield this.pagesModel.deletePage(pageAccess);
            yield this.updateSpacePageIDs(userID, spaceID, (spacePageIDs) => {
                return spacePageIDs.filter((pageID) => pageID !== deletePageID);
            });
            responseSender.sendSuccessJsonResponse({ deleted: true });
        });
    }
    createPageAccess(userID, spaceID, pageID) {
        const pageAccessCreator = new page_access_service_1.PageAccessService();
        return pageAccessCreator
            .setUserID(userID)
            .setSpaceID(spaceID)
            .setPageID(pageID || constants_2.EMPTY_STRING)
            .getPageAccess();
    }
    createNewPage(newPageTitle, pagePathname) {
        return {
            [constants_2.UserDataLabels.PAGE_TITLE]: newPageTitle,
            [constants_2.UserDataLabels.PAGE_DESCRIPTION]: constants_2.EMPTY_STRING,
            [constants_2.UserDataLabels.PAGE_PATHNAME]: pagePathname,
            [constants_2.UserDataLabels.PAGE_CONTENT]: constants_2.EMPTY_STRING,
        };
    }
    updateSpacePageIDs(userID, spaceID, updatingFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const spacePageIDs = yield this.spacesModel.getSpacePageIDs(userID, spaceID);
            const updatedSpace = {
                id: spaceID,
                updates: {
                    [constants_2.UserDataLabels.SPACE_PAGES]: updatingFunction(spacePageIDs),
                    [constants_2.UserDataLabels.SPACE_LAST_UPDATED]: +new Date(),
                },
            };
            this.spacesModel.updateSpace(userID, updatedSpace);
        });
    }
    updateSpaceLastUpdated(userID, spaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSpace = {
                id: spaceID,
                updates: {
                    [constants_2.UserDataLabels.SPACE_LAST_UPDATED]: +new Date(),
                },
            };
            this.spacesModel.updateSpace(userID, updatedSpace);
        });
    }
}
exports.PagesController = PagesController;
