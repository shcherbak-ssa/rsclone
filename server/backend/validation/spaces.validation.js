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
exports.SpacesValidationImpl = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = require("../../common/validation");
const constants_1 = require("../constants");
class SpacesValidationImpl {
    constructor() {
        this.validation = new validation_1.Validation();
    }
    validateCreatedSpace(newSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationSchema = joi_1.default.object({
                    [constants_1.UserDataLabels.SPACE_NAME]: this.validation.spaceName().required().empty(),
                    [constants_1.UserDataLabels.SPACE_COLOR]: this.validation.spaceColor().required(),
                    [constants_1.UserDataLabels.SPACE_LOGO]: this.validation.spaceLogo(),
                });
                return yield validationSchema.validateAsync(newSpace);
            }
            catch (error) {
                validation_1.parseValidationError(error);
            }
        });
    }
    validateUpdatedSpace(updatedSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationSchema = joi_1.default.object({
                    [constants_1.UserDataLabels.SPACE_ID]: joi_1.default.string(),
                    updates: joi_1.default.object({
                        [constants_1.UserDataLabels.SPACE_NAME]: this.validation.spaceName().empty(),
                        [constants_1.UserDataLabels.SPACE_COLOR]: this.validation.spaceColor(),
                        [constants_1.UserDataLabels.SPACE_LOGO]: this.validation.spaceLogo(),
                    }),
                });
                return yield validationSchema.validateAsync(updatedSpace);
            }
            catch (error) {
                validation_1.parseValidationError(error);
            }
        });
    }
}
exports.SpacesValidationImpl = SpacesValidationImpl;
