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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesValidationImpl = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = require("../../common/validation");
const constants_1 = require("../constants");
class PagesValidationImpl {
    constructor() {
        this.validation = new validation_1.Validation();
    }
    validateUpdatedPage(updatedPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationSchema = joi_1.default.object({
                    [constants_1.UserDataLabels.PAGE_ID]: joi_1.default.string(),
                    updates: joi_1.default.object({
                        [constants_1.UserDataLabels.PAGE_TITLE]: this.validation.pageTitle(),
                        [constants_1.UserDataLabels.PAGE_DESCRIPTION]: this.validation.pageDescription(),
                        [constants_1.UserDataLabels.PAGE_CONTENT]: this.validation.pageContent(),
                    }),
                });
                return yield validationSchema.validateAsync(updatedPage);
            }
            catch (error) {
                validation_1.parseValidationError(error);
            }
        });
    }
}
exports.PagesValidationImpl = PagesValidationImpl;
