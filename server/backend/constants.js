"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = exports.CollectionNames = exports.DatabaseNames = exports.UserDataLabels = exports.DEFAULT_PORT = exports.EMPTY_STRING = exports.INITIAL_PATHNAME_COUNT = exports.EMPTY_VALUE_LENGTH = exports.MINUS_REPLACE_STRING = exports.USERS_FILES_DB_DIRNAME = exports.ASSETS_EXTNAME_REGEXP = exports.INDEX_FILENAME = void 0;
exports.INDEX_FILENAME = 'index.html';
exports.ASSETS_EXTNAME_REGEXP = /^\.(js|css|png|svg|ico)$/;
exports.USERS_FILES_DB_DIRNAME = 'db';
exports.MINUS_REPLACE_STRING = '-';
exports.EMPTY_VALUE_LENGTH = 0;
exports.INITIAL_PATHNAME_COUNT = 1;
exports.EMPTY_STRING = '';
exports.DEFAULT_PORT = '3000';
var constants_1 = require("../common/constants");
Object.defineProperty(exports, "UserDataLabels", { enumerable: true, get: function () { return constants_1.UserDataLabels; } });
var DatabaseNames;
(function (DatabaseNames) {
    DatabaseNames["USERS"] = "users";
})(DatabaseNames = exports.DatabaseNames || (exports.DatabaseNames = {}));
;
var CollectionNames;
(function (CollectionNames) {
    CollectionNames["USERS"] = "users";
    CollectionNames["SPACES"] = "spaces";
})(CollectionNames = exports.CollectionNames || (exports.CollectionNames = {}));
;
var Parameters;
(function (Parameters) {
    Parameters["USERNAME"] = "username";
    Parameters["LANGUAGE"] = "language";
})(Parameters = exports.Parameters || (exports.Parameters = {}));
;
