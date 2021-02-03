"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUserData = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../constants");
const keyboard_shortcut_data_1 = require("./keyboard-shortcut.data");
exports.defaultUserData = {
    [constants_2.UserDataLabels.AVATAR]: '',
    [constants_2.UserDataLabels.LANGUAGE]: constants_1.LanguageLabels.ENGLISH,
    [constants_2.UserDataLabels.THEME]: constants_1.Themes.ORIGINAL,
    [constants_2.UserDataLabels.SHORTCUTS]: keyboard_shortcut_data_1.defaultKeyboardShortcuts,
};
