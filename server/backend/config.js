"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
exports.serverConfig = {
    app: {
        publicFolder: 'public',
        languagesFolder: 'languages'
    },
    jwt: {
        options: {
            expiresIn: '1d'
        }
    },
    mongodb: {
        options: {
            useUnifiedTopology: true
        }
    }
};
