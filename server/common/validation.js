"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValidationError = exports.Validation = exports.ValidationError = exports.MAX_PAGE_DESCRIPTION_LENGTH = exports.MAX_PAGE_TITLE_LENGTH = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("./constants");
const constants_2 = require("./constants");
const data_1 = require("./data");
const MIN_PASSWORD_LENGTH = 8;
const MAX_FIELD_LENGTH = 128;
const MIN_PAGE_TITLE_LENGTH = 1;
exports.MAX_PAGE_TITLE_LENGTH = 96;
exports.MAX_PAGE_DESCRIPTION_LENGTH = 256;
class ValidationError {
    constructor(message, payload) {
        this.name = constants_1.ErrorNames.VALIDATION_ERROR;
        this.message = message;
        this.payload = payload;
    }
}
exports.ValidationError = ValidationError;
class Validation {
    avatar() {
        return joi_1.default.string();
    }
    fullname() {
        return this.defaultStringPattern();
    }
    email() {
        return joi_1.default.string()
            .trim()
            .email({ tlds: { allow: false } })
            .max(MAX_FIELD_LENGTH);
    }
    password() {
        return joi_1.default.string()
            .min(MIN_PASSWORD_LENGTH)
            .max(MAX_FIELD_LENGTH);
    }
    username() {
        return joi_1.default.string()
            .trim()
            .pattern(/^[-a-zA-Z0-9]+$/)
            .max(MAX_FIELD_LENGTH);
    }
    language() {
        return joi_1.default.string()
            .valid(constants_1.LanguageLabels.ENGLISH, constants_1.LanguageLabels.RUSSIAN, constants_1.LanguageLabels.ITALIAN);
    }
    theme() {
        return joi_1.default.string()
            .valid(constants_1.Themes.ORIGINAL, constants_1.Themes.LIGHT, constants_1.Themes.DARK);
    }
    shortcuts() {
        return joi_1.default.array()
            .items(joi_1.default.object({
            section: joi_1.default.string()
                .valid(constants_1.ShortcurtsSections.HOMEPAGE, constants_1.ShortcurtsSections.SPACE),
            keys: joi_1.default.string(),
            label: joi_1.default.string()
                .valid(constants_1.ShortcutsLabels.ADD_SPACE),
        }));
    }
    spaceName() {
        return this.defaultStringPattern();
    }
    spaceColor() {
        return joi_1.default.string()
            .valid(...data_1.spaceColors);
    }
    spaceLogo() {
        return joi_1.default.string();
    }
    pageTitle() {
        return joi_1.default.string()
            .trim()
            .min(MIN_PAGE_TITLE_LENGTH)
            .max(exports.MAX_PAGE_TITLE_LENGTH);
    }
    pageDescription() {
        return joi_1.default.string()
            .trim()
            .max(exports.MAX_PAGE_DESCRIPTION_LENGTH);
    }
    pageContent() {
        return joi_1.default.string();
    }
    defaultStringPattern() {
        return joi_1.default.string()
            .trim()
            .pattern(/^[-\w\sа-яА-Я]+$/)
            .max(MAX_FIELD_LENGTH);
    }
}
exports.Validation = Validation;
function parseValidationError(error) {
    const { type, message, context } = error.details[0];
    const { key } = context;
    switch (type) {
        case 'string.empty':
            throwValidationError(message, key, constants_1.ErrorLabels.EMPTY_VALUE);
        case 'string.email':
            throwValidationError(message, key, constants_1.ErrorLabels.INVALID_EMAIL);
        case 'string.min':
            throwValidationError(message, key, constants_1.ErrorLabels.PASSWORD_MIN);
        case 'string.pattern.base':
            throwValidationError(message, key, constants_1.ErrorLabels.ALPHA_NUMERIC);
        case 'string.max':
            throwValidationError(message, key, constants_1.ErrorLabels.FIELD_MAX);
        case 'object.with':
            if (context.main === constants_2.UserDataLabels.PASSWORD) {
                throwValidationError(message, context.peer, constants_1.ErrorLabels.PASSWORD_REQUIRED);
            }
            else {
                throwValidationError(message, context.peer, constants_1.ErrorLabels.NEW_PASSWORD_REQUIRED);
            }
        default:
            throw error;
    }
}
exports.parseValidationError = parseValidationError;
function throwValidationError(message, dataLabel, errorLabel) {
    throw new ValidationError(message, {
        dataLabel: dataLabel,
        errorLabel,
    });
}
