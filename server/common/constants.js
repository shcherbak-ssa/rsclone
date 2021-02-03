"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataLabels = exports.PageDataLabels = exports.SpaceColors = exports.ErrorLabels = exports.ShortcutsLabels = exports.ShortcurtsSections = exports.Themes = exports.LanguageParts = exports.LanguageLabels = exports.ErrorNames = exports.StatusCodes = exports.RequestHeaders = exports.RequestMethods = exports.MiddlewarePathnames = exports.RequestPathnames = exports.AVATAR_LABEL = void 0;
exports.AVATAR_LABEL = 'avatar';
var RequestPathnames;
(function (RequestPathnames) {
    RequestPathnames["LOGIN"] = "/login";
    RequestPathnames["REGISTRATION"] = "/registration";
    RequestPathnames["USERS"] = "/@:username/users";
    RequestPathnames["AVATARS"] = "/@:username/avatars";
    RequestPathnames["SPACES"] = "/@:username/spaces";
    RequestPathnames["PAGES"] = "/@:username/s/:spacePathname";
})(RequestPathnames = exports.RequestPathnames || (exports.RequestPathnames = {}));
;
var MiddlewarePathnames;
(function (MiddlewarePathnames) {
    MiddlewarePathnames["ENTRY"] = "*";
    MiddlewarePathnames["CONTROLLER"] = "*";
    MiddlewarePathnames["AUTH_USER"] = "/@:username";
    MiddlewarePathnames["LANGUAGES"] = "/languages/:language";
    MiddlewarePathnames["AVATARS"] = "/@:username/avatars";
    MiddlewarePathnames["ACTIVE_SPACE"] = "/@:username/s/:spacePathname";
})(MiddlewarePathnames = exports.MiddlewarePathnames || (exports.MiddlewarePathnames = {}));
;
var RequestMethods;
(function (RequestMethods) {
    RequestMethods["GET"] = "GET";
    RequestMethods["POST"] = "POST";
    RequestMethods["PUT"] = "PUT";
    RequestMethods["DELETE"] = "DELETE";
})(RequestMethods = exports.RequestMethods || (exports.RequestMethods = {}));
;
var RequestHeaders;
(function (RequestHeaders) {
    RequestHeaders["AUTHORIZATION"] = "Authorization";
    RequestHeaders["CONTENT_TYPE"] = "Content-Type";
    RequestHeaders["REQUEST_FROM_CODE"] = "request-from-code";
})(RequestHeaders = exports.RequestHeaders || (exports.RequestHeaders = {}));
;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["SUCCESS"] = 200] = "SUCCESS";
    StatusCodes[StatusCodes["CREATED"] = 201] = "CREATED";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodes[StatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCodes[StatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCodes = exports.StatusCodes || (exports.StatusCodes = {}));
;
var ErrorNames;
(function (ErrorNames) {
    ErrorNames["CLIENT_ERROR"] = "ClientError";
    ErrorNames["SERVER_ERROR"] = "ServerError";
    ErrorNames["VALIDATION_ERROR"] = "ValidationError";
})(ErrorNames = exports.ErrorNames || (exports.ErrorNames = {}));
;
var LanguageLabels;
(function (LanguageLabels) {
    LanguageLabels["ENGLISH"] = "en";
    LanguageLabels["RUSSIAN"] = "ru";
    LanguageLabels["ITALIAN"] = "it";
})(LanguageLabels = exports.LanguageLabels || (exports.LanguageLabels = {}));
var LanguageParts;
(function (LanguageParts) {
    LanguageParts["APP"] = "app";
    LanguageParts["AUTH"] = "auth";
    LanguageParts["USER_DRAFT"] = "user-draft";
    LanguageParts["ASSETS"] = "assets";
})(LanguageParts = exports.LanguageParts || (exports.LanguageParts = {}));
var Themes;
(function (Themes) {
    Themes["ORIGINAL"] = "original-theme";
    Themes["LIGHT"] = "light-theme";
    Themes["DARK"] = "dark-theme";
})(Themes = exports.Themes || (exports.Themes = {}));
;
var ShortcurtsSections;
(function (ShortcurtsSections) {
    ShortcurtsSections["HOMEPAGE"] = "homepage";
    ShortcurtsSections["SPACE"] = "space";
})(ShortcurtsSections = exports.ShortcurtsSections || (exports.ShortcurtsSections = {}));
;
var ShortcutsLabels;
(function (ShortcutsLabels) {
    ShortcutsLabels["ADD_SPACE"] = "add-space";
})(ShortcutsLabels = exports.ShortcutsLabels || (exports.ShortcutsLabels = {}));
;
var ErrorLabels;
(function (ErrorLabels) {
    ErrorLabels["EMPTY_VALUE"] = "empty-value";
    ErrorLabels["INVALID_EMAIL"] = "invalid-email";
    ErrorLabels["EMAIL_EXIST"] = "email-exist";
    ErrorLabels["USERNAME_EXIST"] = "username-exist";
    ErrorLabels["PASSWORD_MIN"] = "password-length";
    ErrorLabels["ALPHA_NUMERIC"] = "alpha-numeric";
    ErrorLabels["FIELD_MAX"] = "field-max";
    ErrorLabels["INVALID_USER"] = "invalid-user";
    ErrorLabels["INVALID_FILE_TYPE"] = "invalid-file-type";
    ErrorLabels["NEW_PASSWORD_REQUIRED"] = "new-password-required";
    ErrorLabels["PASSWORD_REQUIRED"] = "password-required";
    ErrorLabels["INVALID_PASSWORD"] = "invalid-password";
})(ErrorLabels = exports.ErrorLabels || (exports.ErrorLabels = {}));
;
var SpaceColors;
(function (SpaceColors) {
    SpaceColors["GREEN"] = "26CB7C";
    SpaceColors["BLUE"] = "03D1EB";
    SpaceColors["DARK_BLUE"] = "3884FF";
    SpaceColors["PURPLE"] = "A44EED";
    SpaceColors["RED"] = "FF4642";
    SpaceColors["ORANGE"] = "F77D05";
    SpaceColors["YELLOW"] = "FFD139";
})(SpaceColors = exports.SpaceColors || (exports.SpaceColors = {}));
;
var PageDataLabels;
(function (PageDataLabels) {
    PageDataLabels["ID"] = "id";
    PageDataLabels["TITLE"] = "title";
    PageDataLabels["DESCRIPTION"] = "description";
    PageDataLabels["NODES"] = "nodes";
})(PageDataLabels = exports.PageDataLabels || (exports.PageDataLabels = {}));
;
var UserDataLabels;
(function (UserDataLabels) {
    UserDataLabels["AVATAR"] = "avatar";
    UserDataLabels["FULLNAME"] = "fullname";
    UserDataLabels["EMAIL"] = "email";
    UserDataLabels["PASSWORD"] = "password";
    UserDataLabels["NEW_PASSWORD"] = "newPassword";
    UserDataLabels["USERNAME"] = "username";
    UserDataLabels["LANGUAGE"] = "language";
    UserDataLabels["THEME"] = "theme";
    UserDataLabels["SHORTCUTS"] = "shortcuts";
    UserDataLabels["SPACE_ID"] = "id";
    UserDataLabels["SPACE_NAME"] = "name";
    UserDataLabels["SPACE_COLOR"] = "color";
    UserDataLabels["SPACE_LOGO"] = "logo";
    UserDataLabels["SPACE_PATHNAME"] = "pathname";
    UserDataLabels["SPACE_PAGES"] = "pages";
    UserDataLabels["SPACE_LAST_UPDATED"] = "lastUpdated";
    UserDataLabels["PAGE_ID"] = "id";
    UserDataLabels["PAGE_TITLE"] = "title";
    UserDataLabels["PAGE_DESCRIPTION"] = "description";
    UserDataLabels["PAGE_PATHNAME"] = "pathname";
    UserDataLabels["PAGE_CONTENT"] = "content";
})(UserDataLabels = exports.UserDataLabels || (exports.UserDataLabels = {}));
;
