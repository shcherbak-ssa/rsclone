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
exports.AuthValidationImpl = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = require("../../common/validation");
const constants_1 = require("../constants");
class AuthValidationImpl {
    constructor() {
        this.validation = new validation_1.Validation();
    }
    validateRegistrationData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationSchema = joi_1.default.object(Object.assign({ [constants_1.UserDataLabels.FULLNAME]: this.validation.fullname().required().empty() }, this.getCommonValidationSchema()));
                yield validationSchema.validateAsync(user);
            }
            catch (error) {
                validation_1.parseValidationError(error);
            }
        });
    }
    validateLoginData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationSchema = joi_1.default.object(Object.assign({}, this.getCommonValidationSchema()));
                yield validationSchema.validateAsync(user);
            }
            catch (error) {
                validation_1.parseValidationError(error);
            }
        });
    }
    getCommonValidationSchema() {
        return {
            [constants_1.UserDataLabels.EMAIL]: this.validation.email().required().empty(),
            [constants_1.UserDataLabels.PASSWORD]: this.validation.password().required().empty(),
        };
    }
}
exports.AuthValidationImpl = AuthValidationImpl;
