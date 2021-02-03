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
exports.UserValidationImpl = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = require("../../common/validation");
const constants_1 = require("../constants");
class UserValidationImpl {
    constructor() {
        this.validation = new validation_1.Validation();
    }
    validate(updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationSchema = joi_1.default.object({
                    [constants_1.UserDataLabels.AVATAR]: this.validation.avatar(),
                    [constants_1.UserDataLabels.FULLNAME]: this.validation.fullname().empty(),
                    [constants_1.UserDataLabels.EMAIL]: this.validation.email().empty(),
                    [constants_1.UserDataLabels.PASSWORD]: this.validation.password().empty(),
                    [constants_1.UserDataLabels.NEW_PASSWORD]: this.validation.password().empty(),
                    [constants_1.UserDataLabels.USERNAME]: this.validation.username().empty(),
                    [constants_1.UserDataLabels.LANGUAGE]: this.validation.language(),
                    [constants_1.UserDataLabels.THEME]: this.validation.theme(),
                    [constants_1.UserDataLabels.SHORTCUTS]: this.validation.shortcuts(),
                })
                    .with(constants_1.UserDataLabels.PASSWORD, constants_1.UserDataLabels.NEW_PASSWORD)
                    .with(constants_1.UserDataLabels.NEW_PASSWORD, constants_1.UserDataLabels.PASSWORD);
                return yield validationSchema.validateAsync(updatedData);
            }
            catch (error) {
                validation_1.parseValidationError(error);
            }
        });
    }
}
exports.UserValidationImpl = UserValidationImpl;
