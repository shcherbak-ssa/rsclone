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
exports.AccessTokenService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const constants_1 = require("../../common/constants");
const errors_service_1 = require("./errors.service");
const AUTH_HEADER_SPLIT_STRING = ' ';
class AccessTokenService {
    constructor() {
        this.jwtOptions = config_1.serverConfig.jwt.options;
    }
    createToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.sign(payload, process.env.JWT_SECRET_KEY, this.jwtOptions);
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return jsonwebtoken_1.verify(token, process.env.JWT_SECRET_KEY, this.jwtOptions);
            }
            catch (error) {
                throw new errors_service_1.ClientError('Did not find authorization token', constants_1.StatusCodes.UNAUTHORIZED);
            }
        });
    }
    getTokenFromAuthHeader(authHeader) {
        return authHeader && authHeader.split(AUTH_HEADER_SPLIT_STRING)[1] || null;
    }
}
exports.AccessTokenService = AccessTokenService;
