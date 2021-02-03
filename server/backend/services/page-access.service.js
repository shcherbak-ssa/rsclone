"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageAccessService = void 0;
class PageAccessService {
    constructor() {
        this.pageAccess = {
            userID: '',
            spaceID: '',
            pageID: '',
        };
    }
    setUserID(userID) {
        this.pageAccess.userID = userID;
        return this;
    }
    setSpaceID(spaceID) {
        this.pageAccess.spaceID = spaceID;
        return this;
    }
    setPageID(pageID) {
        this.pageAccess.pageID = pageID;
        return this;
    }
    getPageAccess() {
        return this.pageAccess;
    }
}
exports.PageAccessService = PageAccessService;
