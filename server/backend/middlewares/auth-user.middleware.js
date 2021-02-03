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
exports.AuthUserMiddleware = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../constants");
const errors_service_1 = require("../services/errors.service");
const auth_user_model_1 = require("../models/auth-user.model");
const access_token_service_1 = require("../services/access-token.service");
const response_sender_service_1 = require("../services/response-sender.service");
class AuthUserMiddleware {
    constructor() {
        this.pathname = constants_1.MiddlewarePathnames.AUTH_USER;
        this.method = null;
        this.authUserModel = new auth_user_model_1.AuthUserModel();
        this.authAccessToken = new access_token_service_1.AccessTokenService();
        this.responseSender = new response_sender_service_1.ResponseSenderService();
    }
    handler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.responseSender.setResponseObject(response);
            try {
                const verifyUser = yield this.verifyToken(request);
                const isValidUser = yield this.verifyUser(verifyUser);
                if (isValidUser) {
                    request.userID = verifyUser.userID;
                    return next();
                }
                throw new errors_service_1.ClientError(`Invalid username '@${verifyUser.username}'`, constants_1.StatusCodes.FORBIDDEN);
            }
            catch (error) {
                this.responseSender.sendErrorResponse(error);
            }
        });
    }
    verifyToken(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getToken(request);
            const { userID } = yield this.authAccessToken.verifyToken(token);
            const username = this.getUsernameFromParameters(request);
            return { userID, username };
        });
    }
    getToken(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = this.getAuthorizationHeader(request);
            const token = this.authAccessToken.getTokenFromAuthHeader(authHeader);
            if (token === null) {
                throw new errors_service_1.ClientError('Did not find authorization token', constants_1.StatusCodes.UNAUTHORIZED);
            }
            return token;
        });
    }
    getAuthorizationHeader(request) {
        return request.headers.authorization;
    }
    getUsernameFromParameters(request) {
        return request.params[constants_2.Parameters.USERNAME];
    }
    verifyUser(verifyUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authUserModel.isValidUser(verifyUser);
        });
    }
}
exports.AuthUserMiddleware = AuthUserMiddleware;
