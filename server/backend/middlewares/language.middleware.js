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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageMiddleware = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../constants");
const valid_data_1 = require("../data/valid.data");
const errors_service_1 = require("../services/errors.service");
const response_sender_service_1 = require("../services/response-sender.service");
const language_model_1 = require("../models/language.model");
class LanguageMiddleware {
    constructor() {
        this.pathname = constants_1.MiddlewarePathnames.LANGUAGES;
        this.method = constants_1.RequestMethods.GET;
        this.responseSender = new response_sender_service_1.ResponseSenderService();
        this.languageModel = new language_model_1.LanguageModel();
    }
    handler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.responseSender.setResponseObject(response);
            try {
                const requestedLanguage = this.getRequestedLanguageFromParameters(request);
                this.validateRequestedLanguage(requestedLanguage, request);
                const requestedLanguageParts = this.getRequestedLanguagePartsFromQuery(request);
                this.validateRequestedLanguageParts(requestedLanguageParts, request);
                const resultObject = yield this.languageModel.getLanguageParts(requestedLanguage, requestedLanguageParts);
                this.responseSender.sendSuccessJsonResponse(resultObject);
            }
            catch (error) {
                this.responseSender.sendErrorResponse(error);
            }
        });
    }
    getRequestedLanguageFromParameters(request) {
        return request.params[constants_2.Parameters.LANGUAGE];
    }
    validateRequestedLanguage(requestedLanguage, request) {
        if (!valid_data_1.validLanguages.includes(requestedLanguage)) {
            this.throwNotFindError(request);
        }
    }
    getRequestedLanguagePartsFromQuery(request) {
        return request.query.languageParts;
    }
    validateRequestedLanguageParts(requestedLanguageParts, request) {
        requestedLanguageParts.forEach((langaugePart) => {
            if (!valid_data_1.validLanguageParts.includes(langaugePart)) {
                this.throwNotFindError(request);
            }
        });
    }
    throwNotFindError(request) {
        throw new errors_service_1.ClientError(`Resource on '${request.originalUrl}' not found`, constants_1.StatusCodes.NOT_FOUND);
    }
}
exports.LanguageMiddleware = LanguageMiddleware;
