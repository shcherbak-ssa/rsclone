"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validLanguageParts = exports.validLanguages = void 0;
const constants_1 = require("../../common/constants");
exports.validLanguages = [
    constants_1.LanguageLabels.ENGLISH,
    constants_1.LanguageLabels.RUSSIAN,
    constants_1.LanguageLabels.ITALIAN,
];
exports.validLanguageParts = [
    constants_1.LanguageParts.APP,
    constants_1.LanguageParts.AUTH,
    constants_1.LanguageParts.USER_DRAFT,
    constants_1.LanguageParts.ASSETS,
];
