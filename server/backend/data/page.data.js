"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialPage = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../constants");
exports.initialPage = {
    [constants_1.LanguageLabels.ENGLISH]: {
        [constants_2.UserDataLabels.PAGE_TITLE]: 'Initial page',
        [constants_2.UserDataLabels.PAGE_DESCRIPTION]: constants_2.EMPTY_STRING,
        [constants_2.UserDataLabels.PAGE_PATHNAME]: 'initial-page',
        [constants_2.UserDataLabels.PAGE_CONTENT]: constants_2.EMPTY_STRING,
    },
    [constants_1.LanguageLabels.RUSSIAN]: {
        [constants_2.UserDataLabels.PAGE_TITLE]: 'Начальная страница',
        [constants_2.UserDataLabels.PAGE_DESCRIPTION]: constants_2.EMPTY_STRING,
        [constants_2.UserDataLabels.PAGE_PATHNAME]: 'начальная-страница',
        [constants_2.UserDataLabels.PAGE_CONTENT]: constants_2.EMPTY_STRING,
    },
    [constants_1.LanguageLabels.ITALIAN]: {
        [constants_2.UserDataLabels.PAGE_TITLE]: 'Pagina iniziale',
        [constants_2.UserDataLabels.PAGE_DESCRIPTION]: constants_2.EMPTY_STRING,
        [constants_2.UserDataLabels.PAGE_PATHNAME]: 'pagina-iniziale',
        [constants_2.UserDataLabels.PAGE_CONTENT]: constants_2.EMPTY_STRING,
    },
};
